import { SandpackFiles, SandpackThemeProp } from '@codesandbox/sandpack-react'
import React from 'react'

export type ITemplates = 'vue' | 'react'

export interface ICodebox {
  files?: SandpackFiles
  template: ITemplates
  theme?: SandpackThemeProp
  style?: React.CSSProperties
  preview?: boolean
  customPreview?: boolean
  options?: {
    showLineNumbers?: boolean
  }
}
