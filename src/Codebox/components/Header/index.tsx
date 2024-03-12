import { useSandpack } from '@codesandbox/sandpack-react'
import { ITemplates } from 'file-explorer/Codebox/types'
import React, { useMemo, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Icons } from '../Icons'

interface IHeader {
  template?: ITemplates
  onSelectTemplate?: (template: ITemplates) => void
}

export const Header: React.FC<IHeader> = () => {
  const { sandpack } = useSandpack()

  const [copyed, setCopyed] = useState(false)

  const filesCode = useMemo(() => {
    return `window.codeboxFiles = ${JSON.stringify(sandpack.files, null, 2).replace(/<\/script>/g, '<\\/script>')}`
  }, [sandpack.files])

  const copyCode = () => {
    setCopyed(true)
    setTimeout(() => {
      setCopyed(false)
    }, 3000)
  }

  // const handleChangeTemplate = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   onSelectTemplate?.(e.target.value as ITemplates)
  // }

  return (
    <div className='codebox__header'>
      <div className='codebox__header-left'>
        <span className='codebox__header__logo'>Codebox</span>
        {/* <span className='codebox__header__template'> */}
        {/*  <select onChange={handleChangeTemplate} value={template}> */}
        {/*    <option value='vue'>Vue</option> */}
        {/*    <option value='react'>React</option> */}
        {/*  </select> */}
        {/* </span> */}
      </div>

      <div className='codebox__header-right'>
        <CopyToClipboard text={filesCode} onCopy={copyCode}>
          <span title='Copy code'>
            {copyed ? <Icons name='success' /> : <Icons name='copyCode' />}
          </span>
        </CopyToClipboard>

        <a href='https://github.com/fewismuch/codebox' target='_blank' title='View on GitHub'>
          <Icons name='github' />
        </a>
      </div>
    </div>
  )
}
