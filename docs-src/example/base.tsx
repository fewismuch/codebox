import Codebox, { templateCodes } from '@rainetian/codebox'
import React from 'react'

const App = () => {
  const files = templateCodes.vue

  return (
    <div style={{ height: 300 }}>
      <Codebox template='vue' files={files} />
    </div>
  )
}
export default App
