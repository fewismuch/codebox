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
  preview?: boolean
  customPreview?: boolean
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
const handlePlatform = async (rootId: string, platform?: string) => {
  if (platform === 'juejin') {
    document.body.setAttribute('style', 'padding: 0; margin: 0;')
    document.querySelector(`#${rootId}`)?.setAttribute('style', 'height: 100vh; width: 100vw;')
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 0)
    })
  }
}

export const run = async (params: IRun) => {
  const {
    rootId = 'root',
    template,
    platform,
    theme,
    files,
    preview = true,
    customPreview = false,
  } = params || {}

  if (!params?.template) {
    throw new Error('Codebox.run(params) params must have template, template: vue | react')
  }

  const rootElement = document.getElementById(rootId)
  if (!rootElement) {
    throw new Error(`${rootId} is not found in the document.`)
  }

  await handlePlatform(rootId, platform)

  const customFiles = files || window.codeboxFiles || templateCodes[template]

  ReactDOM.createRoot(rootElement!).render(
    <React.StrictMode>
      <div style={{ height: '100%', width: '100%' }}>
        <Codebox
          template={template}
          files={customFiles}
          theme={theme ? ThemeMap[theme] : undefined}
          preview={preview}
          customPreview={customPreview}
        />
      </div>
    </React.StrictMode>
  )

  return true
}
