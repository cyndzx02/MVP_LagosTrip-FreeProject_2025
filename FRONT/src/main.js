import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import du router
import './registerServiceWorker'

if (module.hot){
    module.hot.accept();
}

const app = createApp(App)
app.use(router) // Utilisation de Vue Router
app.mount('#app')
