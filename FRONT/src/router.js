import { createRouter, createWebHistory } from 'vue-router'
import Paiyement from './components/PaiyementPage.vue'
import ResumeCommand from './components/ResumeCommand.vue'
import ViewCategorie from './components/ViewCategorie.vue'
import SpecifiqueFood from './components/SpecifiqueFood.vue'
import PanierView from './components/PanierView.vue'
import RegisterPage from './components/Register.vue'
import LoginPage from './components/LoginPage.vue'
import HomePage from './components/Home.vue'
import PageChekValidCart from './components/PageChekValidCart.vue'
import TransferPage from './components/TransferPage.vue'
import FactureView from './components/FactureView.vue'

const routes = [
  { path: '/Paiement', component:  Paiyement, name: 'Paiement' },
  { path: '/ResumeCommand', component: ResumeCommand, name: 'ResumeCommand' },
  {  path: '/ViewCategorie/:category', name: 'ViewCategorie', component: ViewCategorie }, // Route dynamique pour la catégorie
  { path: '/SpecifiqueFood/:foodName', name: 'SpecifiqueFood',component: SpecifiqueFood },
  { path: '/PanierView', component: PanierView ,name: 'Panier'},
  // { path: '/PanierView', component: PanierView },
  { path: '/login', component: LoginPage },
  { path: '/home', component: HomePage },
  { path: '/register', component: RegisterPage },
  { path: '/PageChekValidCart', component: PageChekValidCart},
  { path: '/TransferPage', component: TransferPage, name: 'TransferPage'},
  { path: '/FactureView', component: FactureView, name: 'FactureView'},


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
