// import type { SANDBOX_TEMPLATES } from '@codesandbox/sandpack-react'
// type templateType = typeof SANDBOX_TEMPLATES

export type ITemplates = 'vue' | 'react'

export interface ICodebox {
  files?: Record<string, { code: string }>
  // template?: keyof templateType
  template: ITemplates

  // style?: React.CSSProperties
  // readOnly?: boolean
}
