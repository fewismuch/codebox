import Codebox from '@rainetian/codebox'
import React from 'react'

const App = () => {
  const files = {
    '/App.js': {
      code: 'import React from "react";\n\nexport default function App() {\n  return <h1>Hello react</h1>\n}\n',
    },
    '/index.js': {
      code: 'import React, { StrictMode } from "react";\nimport { createRoot } from "react-dom/client";\n\nimport App from "./App";\n\nconst root = createRoot(document.getElementById("root"));\nroot.render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);',
    },
    '/public/index.html': {
      code: '<div id="root"></div>',
    },
  }

  return (
    <div style={{ height: 300 }}>
      <Codebox template='react' customPreview files={files} />
    </div>
  )
}
export default App
