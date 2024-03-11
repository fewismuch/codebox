import { autocompletion, completionKeymap } from '@codemirror/autocomplete'
import { foldGutter } from '@codemirror/language'
import { SandpackCodeEditor, SandpackLayout, SandpackProvider } from '@codesandbox/sandpack-react'
import SandpackFileExplorer from '@rainetian/sandpack-file-explorer'
import React from 'react'

import { Header } from './components/Header'
import { Preview } from './components/Preview'
import { SplitPane } from './components/SplitPane'
import { ICodebox } from './types'

import './index.less'

export const Codebox: React.FC<ICodebox> = (props) => {
  const { files, template, theme } = props

  const codemirrorInstance = React.useRef(null)

  return (
    <div className='rainetian-codebox'>
      <SandpackProvider theme={theme} template={template} files={files}>
        <Header />
        <SandpackLayout>
          <SplitPane>
            <SandpackFileExplorer />
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
              showLineNumbers
              showInlineErrors
            />
            {/* <SandpackPreview showOpenInCodeSandbox={false} showOpenNewtab showNavigator /> */}
            <Preview template={template} />
          </SplitPane>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  )
}
