export const templateCodes = {
  vue: {
    '/src/styles.css': {
      code: 'body {\n  font-family: sans-serif;\n  -webkit-font-smoothing: auto;\n  -moz-font-smoothing: auto;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: auto;\n  text-rendering: optimizeLegibility;\n  font-smooth: always;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n}\n\nh1 {\n  font-size: 1.5rem;\n}',
    },
    '/src/App.vue': {
      code: "<template>\n  <h1>Hello {{ msg }}</h1>\n</template>\n\n<script setup>\nimport { ref } from 'vue';\nconst msg = ref('vue');\n</script>",
    },
    '/src/main.js': {
      code: "import { createApp } from 'vue'\nimport App from './App.vue'\nimport \"./styles.css\";\n\ncreateApp(App).mount('#app')\n",
    },
    '/public/index.html': {
      code: '<div id="app"></div>',
    },
    '/package.json': {
      code: '{\n  "name": "vue3",\n  "version": "0.1.0",\n  "private": true,\n  "main": "/src/main.js",\n  "scripts": {\n    "serve": "vue-cli-service serve",\n    "build": "vue-cli-service build"\n  },\n  "dependencies": {\n    "core-js": "^3.26.1",\n    "vue": "^3.2.45"\n  },\n  "devDependencies": {\n    "@vue/cli-plugin-babel": "^5.0.8",\n    "@vue/cli-service": "^5.0.8"\n  }\n}',
    },
  },
  react: {
    '/styles.css': {
      code: 'body {\n  font-family: sans-serif;\n  -webkit-font-smoothing: auto;\n  -moz-font-smoothing: auto;\n  -moz-osx-font-smoothing: grayscale;\n  font-smoothing: auto;\n  text-rendering: optimizeLegibility;\n  font-smooth: always;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n}\n\nh1 {\n  font-size: 1.5rem;\n}',
    },
    '/App.jsx': {
      code: 'import React from "react";\n\nexport default function App() {\n  return <h1>Hello react</h1>\n}\n',
    },
    '/index.jsx': {
      code: 'import React, { StrictMode } from "react";\nimport { createRoot } from "react-dom/client";\nimport "./styles.css";\n\nimport App from "./App";\n\nconst root = createRoot(document.getElementById("root"));\nroot.render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);',
    },
    '/public/index.html': {
      code: '<div id="root"></div>',
    },
    '/package.json': {
      code: '{\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0",\n    "react-scripts": "^5.0.0"\n  },\n  "devDependencies": {}\n}',
    },
  },
  static: {
    '/index.css': {
      code: '.title {color: #1677ff}',
    },
    '/index.js': {
      code: 'console.log("hello world")',
    },
    '/index.html': {
      code: '<!DOCTYPE html>\n<html lang="zh">\n <head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n  <link rel="stylesheet" href="./index.css">\n  <script src="./index.js"></script>\n </head>\n <body>\n  <div class="title">Hello world</div>\n </body>\n</html>',
    },
  },
}
