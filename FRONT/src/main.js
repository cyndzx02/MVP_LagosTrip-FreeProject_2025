import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import du router
import './registerServiceWorker'

const app = createApp(App)
app.use(router) // Utilisation de Vue Router
app.mount('#app')
