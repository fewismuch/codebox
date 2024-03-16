import { useSandpack } from '@codesandbox/sandpack-react'
import { useThrottleEffect } from 'ahooks'
import React, { useEffect, useRef } from 'react'

import { transformHTML } from './utils'

interface IPreview {
  template: string
  entryFile: string
  rootId: string
  esmServiceUrl?: string
}

export const Preview: React.FC<IPreview> = (props) => {
  const { template, entryFile, rootId, esmServiceUrl } = props
  const { sandpack } = useSandpack()
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const compile = async () => {
    const iframeDoc = iframeRef?.current?.contentDocument as Document
    iframeDoc.body.querySelector('#root')?.remove()
    iframeDoc.body.querySelector('#app')?.remove()

    let indexHtml =
      sandpack.files['/public/index.html']?.code || `<div id="${rootId}">Loading...</div>`
    if (template === 'static') {
      indexHtml = sandpack.files['/index.html']?.code
      indexHtml = transformHTML(indexHtml, sandpack.files)
    }

    iframeDoc.open()
    iframeDoc.write(indexHtml)
    iframeDoc.close()

    // @ts-ignore
    const contentWindow: any = iframeRef?.current?.contentWindow
    contentWindow?.updateFiles?.(sandpack.files)
    contentWindow?.codeboxRun?.()
  }

  useEffect(() => {
    if (template === 'static') return
    const iframeDoc = iframeRef?.current?.contentDocument as Document
    const scriptElement = document.createElement('script')
    scriptElement.id = 'esbuild-wasm-compiler'
    scriptElement.type = 'module'
    scriptElement.innerHTML = `
    import {Compiler} from 'https://pdn.zijieapi.com/esm/bv/@rainetian/esbuild-wasm-compiler@0.0.18'

    let files = ${JSON.stringify(sandpack.files).replace(/<\/script>/g, '</script>')}
    
    function updateFiles(newFiles) {
      files = newFiles
    }
    
    const compiler = new Compiler(
        {
          getFileContent: (path) => {
            const filePath = Object.keys(files).find((item) => item.startsWith(path))
            const content = filePath ? files[filePath] : null
            if (!content) {
              throw new Error('File not found')
            }
            return content.code
          },
        },{
          wasmURL:'https://unpkg.com/esbuild-wasm@0.20.0/esbuild.wasm',
          ${esmServiceUrl ? `esmServiceUrl: '${esmServiceUrl}',` : ''}
        }
      )
      
      async function codeboxRun() {
        const code = await compiler.compile('${entryFile}')
        // console.log(code)
        // 编译报错信息
        if (typeof code !== 'string' && code.error) {
          const rootEle = document.querySelector('#${rootId}')
          if(rootEle) rootEle.innerHTML = code.message
          if(!rootEle) document.body.innerHTML = code.message
          return
        }
        
        document.querySelector('#codebox')?.remove()
        const script = document.createElement('script')
        script.id = 'codebox'
        script.type = 'module'
        script.innerHTML = code
        document.body.appendChild(script)
      }
      window.updateFiles = updateFiles
      window.codeboxRun = codeboxRun
      
      codeboxRun()
    `
    iframeDoc.body.appendChild(scriptElement)
  }, [])

  useThrottleEffect(
    () => {
      compile()
    },
    [sandpack.files, template],
    {
      wait: 500,
    }
  )

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
        style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }}
        ref={iframeRef}
        className='codebox__preview__iframe'
        sandbox='allow-popups-to-escape-sandbox allow-scripts allow-popups allow-forms allow-pointer-lock allow-top-navigation allow-modals allow-same-origin'
      />
    </div>
  )
}
