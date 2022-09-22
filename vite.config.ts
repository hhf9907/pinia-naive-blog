import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [vue()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8000
    // proxy: {
    //   '/api': {
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //     target: 'http://127.0.0.1:3000',
    //     changeOrigin: true
    //   }
    // }
  },
  // 生产环境打包配置
  build: {
    target: 'es2015', // 浏览器兼容性
    cssTarget: 'chrome79', // 此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target
    chunkSizeWarningLimit: 2000, // chunk 大小警告的限制（以 kbs 为单位）。
    outDir: 'dist', // 指定输出路径
    assetsDir: 'static', // 指定生成静态资源的存放路径（相对于 build.outDir）。
    manifest: false // 当设置为 true，构建后将会生成 manifest.json 文件，包含了没有被 hash 的资源文件名和 hash 后版本的映射。可以为一些服务器框架渲染时提供正确的资源引入链接。
  }
})
