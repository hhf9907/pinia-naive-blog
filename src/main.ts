import { createApp } from 'vue'
import { registerApp } from './global'
import 'normalize.css'
import '@/assets/css/index.less'
import App from './App.vue'
import router from './router'
import './router/permission' // permission control
import store from './store/index'
const app = createApp(App)

// 调用use时传入的函数会自动传入app
app.use(registerApp)
app.use(store)
app.use(router)
app.mount('#app')
