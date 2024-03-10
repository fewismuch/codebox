import { Codebox } from './Codebox'

export { templateCodes } from './Codebox/template'

export type * from './Codebox/types'

export default Codebox

export const codeboxBrowser = (Compiler: any, template: string, rootId: string) => {
  const files: any = {
    '/main.js': `import React from 'react'
        import ReactDOM from 'react-dom/client'
        import Codebox from '@rainetian/codebox'
        
        ReactDOM.createRoot(document.getElementById('root')).render(
          <React.StrictMode>
            <Codebox template="react"/>
          </React.StrictMode>
        )`,
  }

  const compiler = new Compiler({
    getFileContent: (path: string) => {
      return Compiler.getFileContent(path, files)
    },
  })

  compiler.createApp('/main.js').mount(`#${rootId}`)
}
