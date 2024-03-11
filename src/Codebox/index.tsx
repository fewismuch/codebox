import { autocompletion, completionKeymap } from '@codemirror/autocomplete'
import { foldGutter } from '@codemirror/language'
import {
  SandpackCodeEditor,
  SandpackFiles,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  useSandpack,
} from '@codesandbox/sandpack-react'
import SandpackFileExplorer from '@rainetian/sandpack-file-explorer'
import React, { useEffect, useState } from 'react'

import { Header } from './components/Header'
import { Preview } from './components/Preview'
import { SplitPane } from './components/SplitPane'
import { ICodebox } from './types'

import './index.less'

const FilesWorker = ({
  onOk,
  files,
  entryFile,
}: {
  onOk: () => void
  files?: SandpackFiles
  entryFile: string
}) => {
  const { sandpack } = useSandpack()

  useEffect(() => {
    if (files && Object.keys(files).length) {
      sandpack.setActiveFile(entryFile)
      Object.keys(sandpack.files).forEach((key) => {
        if (entryFile !== key) {
          sandpack.closeFile(key)
        }
        if (!files[key]) {
          sandpack.deleteFile(key)
        }
      })
      setTimeout(() => {
        onOk()
      }, 0)
    } else {
      onOk()
    }
  }, [])

  return <></>
}

export const Codebox: React.FC<ICodebox> = (props) => {
  const {
    files,
    template,
    theme,
    style,
    preview = true,
    customPreview = false,
    options = { showLineNumbers: true },
  } = props
  const [filesProcessed, setFilesProcessed] = useState(false)

  const codemirrorInstance = React.useRef(null)

  const rootId = template === 'vue' ? 'app' : 'root'
  const entryFile = template === 'vue' ? '/src/main.js' : '/index.js'

  return (
    <div className='rainetian-codebox'>
      <SandpackProvider theme={theme} template={template} files={files}>
        <FilesWorker files={files} entryFile={entryFile} onOk={() => setFilesProcessed(true)} />
        {!filesProcessed ? null : (
          <>
            <Header />
            <SandpackLayout>
              <SplitPane>
                <SandpackFileExplorer style={style} />
                <SandpackCodeEditor
                  ref={codemirrorInstance}
                  extensions={[
                    autocompletion(),
                    foldGutter({
                      openText: '-',
                      closedText: '+',
                    }),
                  ]}
                  extensionsKeymap={[completionKeymap as any]}
                  showTabs
                  closableTabs
                  showLineNumbers={options.showLineNumbers}
                  showInlineErrors
                />
                {preview ? (
                  customPreview ? (
                    <Preview template={template} rootId={rootId} entryFile={entryFile} />
                  ) : (
                    <SandpackPreview />
                  )
                ) : null}
              </SplitPane>
            </SandpackLayout>
          </>
        )}
      </SandpackProvider>
    </div>
  )
}
