import { App } from 'vue'

import registerElement from './register-naive-ui'
import directives from './directives'
import registerMdEditor from './register-md-editor'

export function registerApp(app: App): void {
  app.use(registerElement)
  app.use(directives)
  app.use(registerMdEditor)
}
