import { defineConfig } from 'dumi'

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const isDev = env === 'development'

export default defineConfig({
  base: isDev ? '/' : '/codebox/',
  publicPath: '/codebox/',
  exportStatic: {},
  // apiParser: {},
  resolve: {
    docDirs: ['docs-src'],
    // API 解析将从这里开始
    // entryFile: './src/index.ts',
  },
  outputPath: 'docs',
  themeConfig: {
    name: 'codebox',
  },
  favicons: [
    'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
  ],
  logo: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
  styles: [
    `
    .dumi-default-header .dumi-default-header-left {
      width: auto;
    }
  `,
  ],
})
