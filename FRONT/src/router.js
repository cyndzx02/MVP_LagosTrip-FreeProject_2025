import { createRouter, createWebHistory } from 'vue-router'
import Paiyement from './components/PaiyementPage.vue'
import ResumeCommand from './components/ResumeCommand.vue'
import ViewCategorie from './components/ViewCategorie.vue'
import SpecifiqueFood from './components/SpecifiqueFood.vue'
import PanierView from './components/PanierView.vue'
import RegisterPage from './components/Register.vue'
import LoginPage from './components/LoginPage.vue'
import HomePage from './components/Home.vue'
const routes = [
  { path: '/Paiement', component:  Paiyement },
  { path: '/ResumeCommand', component: ResumeCommand },
  { path: '/ViewCategorie', component: ViewCategorie },
  { path: '/SpecifiqueFood', component: SpecifiqueFood },
  { path: '/PanierView', component: PanierView },
  { path: '/PanierView', component: PanierView },
  { path: '/login', component: LoginPage },
  { path: '/home', component: HomePage },
  { path: '/register', component: RegisterPage },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
