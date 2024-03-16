import { SandpackFiles } from '@codesandbox/sandpack-react'

function extractResources(htmlString: string) {
  // 创建DOM解析器实例
  const parser = new DOMParser()
  // 解析HTML字符串为DOM对象
  const doc = parser.parseFromString(htmlString, 'text/html')

  // 创建用于存储资源路径的数组
  const cssPaths: (string | null)[] = []
  const jsPaths: (string | null)[] = []

  // 获取所有的link和script标签
  const linkTags = doc.querySelectorAll('link[rel="stylesheet"]')
  const scriptTags = doc.querySelectorAll('script')

  // 提取CSS资源路径
  linkTags.forEach((link) => {
    if (link.getAttribute('rel') === 'stylesheet') {
      cssPaths.push(link.getAttribute('href'))
    }
  })

  // 提取JavaScript资源路径
  scriptTags.forEach((script) => {
    if (script.getAttribute('src')) {
      jsPaths.push(script.getAttribute('src'))
    }
  })

  // 返回提取到的资源路径
  return {
    css: cssPaths,
    js: [...jsPaths],
  }
}

function replaceResources(htmlString: string, oldResource: string, newResource: string) {
  // 创建DOM解析器实例
  const parser = new DOMParser()
  // 解析HTML字符串为DOM对象
  const doc = parser.parseFromString(htmlString, 'text/html')

  // 获取所有的link和script标签
  const linkTags = doc.querySelectorAll('link[rel="stylesheet"]')
  const scriptTags = doc.querySelectorAll('script')

  // 替换CSS资源路径
  linkTags.forEach((link) => {
    const linkEle = link.getAttribute('rel')
    if (linkEle === 'stylesheet') {
      const cssHref = link.getAttribute('href')
      if (cssHref === oldResource) {
        link.setAttribute('href', newResource)
      }
    }
  })

  // 替换JavaScript资源路径
  scriptTags.forEach((script) => {
    const src = script.getAttribute('src')
    if (src === oldResource) {
      script.setAttribute('src', newResource)
    }
  })

  // 返回替换资源路径后的HTML字符串
  return doc.documentElement.outerHTML
}

export function transformHTML(htmlString: string, files: SandpackFiles) {
  const htmlInnerResources = extractResources(htmlString)
  const dirname = '.'

  htmlInnerResources.css.forEach((cssPath) => {
    if (cssPath) {
      const cssFile = files[cssPath.replace(dirname, '')]
      const cssContent = (typeof cssFile === 'string' ? cssFile : cssFile?.code) || ''
      const cssContentUrl = URL.createObjectURL(new Blob([cssContent]))
      htmlString = replaceResources(htmlString, cssPath, cssContentUrl)
    }
  })

  htmlInnerResources.js.forEach((jsPath) => {
    if (jsPath) {
      const jsFile = files[jsPath.replace(dirname, '')]
      const jsContent = (typeof jsFile === 'string' ? jsFile : jsFile?.code) || ''
      const jsContentUrl = URL.createObjectURL(new Blob([jsContent]))
      htmlString = replaceResources(htmlString, jsPath, jsContentUrl)
    }
  })

  return htmlString
}
