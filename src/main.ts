import 'normalize.css'
import 'animate.css'
import 'nprogress/nprogress.css'
import './styles/base.scss'
import './styles/utils.scss'
import './styles/themes.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
