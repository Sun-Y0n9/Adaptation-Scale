import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/fonts/font.css'
import './assets/style/reset.css'
import './assets/style/common.scss'
createApp(App).use(store).use(router).mount('#app')
