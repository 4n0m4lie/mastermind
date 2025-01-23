import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import profil from '@/plugin/profil.js'

const app = createApp(App)

app.use(router)
app.use(profil)
app.mount('#app')
