// main.js ou main.ts
// main.js ou main.ts
// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')


import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css';
import axios from './axiosConfig'; // Importation de l'intercepteur
import 'leaflet/dist/leaflet.css';


// import store from './store'
import router from './components/router'


const app = createApp(App)
// app.use(store)
app.use(router)
app.config.globalProperties.$axios = axios; // Optionnel : accès global à Axios
app.mount('#app')