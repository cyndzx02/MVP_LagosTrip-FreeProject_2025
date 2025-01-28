import { createApp } from 'vue'
import App from './App.vue'
import Routes from './router.js'
const app = createApp(App);
app.use(Routes);
app.mount('#app');
