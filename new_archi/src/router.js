import { createRouter, createWebHistory } from 'vue-router'
import Paiyement from './components/PaiyementPage.vue'
import ResumeCommand from './components/ResumeCommand.vue'
import ViewCategorie from './components/ViewCategorie.vue'
import SpecifiqueFood from './components/SpecifiqueFood.vue'
import PanierView from './components/PanierView.vue'

const routes = [
  { path: '/Paiyement', component:  Paiyement },
  { path: '/ResumeCommand', component: ResumeCommand },
  { path: '/ViewCategorie', component: ViewCategorie },
  { path: '/SpecifiqueFood', component: SpecifiqueFood },
  { path: '/PanierView', component: PanierView },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
