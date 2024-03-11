import { defineConfig } from 'father'

// 如何替换版本号到代码中的变量里
export default defineConfig({
  platform: 'browser',
  esm: {
    output: 'dist/esm',
    ignores: ['src/browser.tsx'],
  },
  umd: {
    entry: {
      'src/browser': {
        name: 'Codebox',
        // 覆盖转换less的插件,umd不需要转换less
        extraBabelPlugins: [],
        extractCSS: false,
        output: {
          path: 'dist/umd',
          filename: 'codebox.min.js',
        },
      },
    },
  },
  plugins: ['./plugins/loader.ts'],
  extraBabelPlugins: [
    [
      './plugins/babel-less-to-css.js', // 把 js/ts 文件中的 '.less' 字符转为 '.css'
      {
        test: '\\.less',
      },
    ],
  ],
})
