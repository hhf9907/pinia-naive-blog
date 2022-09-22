/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare interface Window {
  $message: any
}
declare module '*.json' {
  const value: any;
  export default value;
}
declare interface ImportMeta {
  env: Record<string, unknown>;
}

declare module '@kangc/v-md-editor/lib/theme/vuepress.js'
declare module '@kangc/v-md-editor/lib/theme/github.js'
declare module '@kangc/v-md-editor/lib/codemirror-editor'
declare module '@kangc/v-md-editor/lib/plugins/highlight-lines/index'
declare module 'prismjs'
declare module '@kangc/v-md-editor/lib/preview-html'
declare module '@kangc/v-md-editor/lib/preview'
declare module '@kangc/v-md-editor/lib/plugins/copy-code/index'
declare module '@kangc/v-md-editor/lib/plugins/mermaid/cdn'
declare module '@kangc/v-md-editor/lib/plugins/emoji/index'
declare module '@kangc/v-md-editor/lib/plugins/tip/index'
declare module '@kangc/v-md-editor/lib/plugins/line-number/index'