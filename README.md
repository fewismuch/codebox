# codebox

[![NPM version](https://img.shields.io/npm/v/@rainetian/codebox.svg?style=flat)](https://npmjs.org/package/@rainetian/codebox)

## 介绍

codebox 是一个在线代码编辑器，支持自定义文件文件夹，支持 react、vue、html多种模板

## 安装

```shell
npm install @rainetian/codebox
```

## 使用

```tsx
import Codebox from '@rainetian/codebox'
import React from 'react'

const App = () => {
  return (
    <div style={{ height: 300 }}>
      <Codebox template='react' customPreview />
    </div>
  )
}
export default App

```

## 配置项

```tsx
export type ITemplates = 'vue' | 'react' | 'static'

export interface ICodebox {
  files?: SandpackFiles
  template: ITemplates
  theme?: SandpackThemeProp
  style?: React.CSSProperties
  // 是否显示预览
  preview?: boolean
  // 自定义渲染: 否则使用sandpack默认渲染
  customPreview?: boolean
  // esmServiceUrl
  esmServiceUrl?: string
}

```

## LICENSE

MIT
