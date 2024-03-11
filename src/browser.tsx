import { SandpackThemeProp } from '@codesandbox/sandpack-react'
import {
  amethyst,
  aquaBlue,
  atomDark,
  cobalt2,
  cyberpunk,
  dracula,
  ecoLight,
  freeCodeCampDark,
  githubLight,
  gruvboxDark,
  gruvboxLight,
  levelUp,
  monokaiPro,
  neoCyan,
  nightOwl,
  sandpackDark,
} from '@codesandbox/sandpack-themes'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Codebox } from './Codebox'
import { templateCodes } from './Codebox/template'
import { ITemplates } from './Codebox/types'

interface IRun {
  template: ITemplates
  rootId?: string
  files?: any
  platform?: string
  theme?: string
}

const ThemeMap: Record<string, SandpackThemeProp> = {
  amethyst,
  aquaBlue,
  atomDark,
  cobalt2,
  cyberpunk,
  dracula,
  ecoLight,
  freeCodeCampDark,
  githubLight,
  gruvboxDark,
  gruvboxLight,
  levelUp,
  monokaiPro,
  neoCyan,
  nightOwl,
  sandpackDark,
  dark: 'dark',
  light: 'light',
}

// 处理平台样式
const handlePlatform = async (platform?: string) => {
  if (platform === 'juejin') {
    document.body.style.padding = '0'
    document.body.style.margin = '0'
    document.querySelector('#root')?.setAttribute('style', 'height: 100vh; width: 100vw;')
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 0)
    })
  }
}

export const run = async (params: IRun) => {
  if (!params?.template) {
    throw new Error('run() params must have template, template: vue | react')
    return false
  }
  const { rootId = 'root', template, platform, theme, files } = params || {}

  await handlePlatform(platform)

  const customFiles = files || window.codeboxFiles || templateCodes[template]

  ReactDOM.createRoot(document.getElementById(rootId)!).render(
    <React.StrictMode>
      <div style={{ height: '100%', width: '100%' }}>
        <Codebox
          template={template}
          files={customFiles}
          theme={theme ? ThemeMap[theme] : undefined}
        />
      </div>
    </React.StrictMode>
  )

  return true
}
