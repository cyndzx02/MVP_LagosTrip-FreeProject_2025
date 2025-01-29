// src/components/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Register from '../Register.vue'
import Login from '../Login.vue'
import Home from '../Home.vue'

const routes = [
  {path: '/register', name: 'Register', component: Register},
  {path: '/login', name: 'Login', component: Login},
  { path: '/home', name: 'Home',component: Home },

  // { path: '/Home', component: Home , meta: { requiresAuth: true }},

]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: routes,
  linkActiveClass: 'active'
})

  
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('authToken');

//   // Si l'utilisateur n'a pas de token et essaie d'accéder à une page protégée
//   if (!token && to.meta.requiresAuth) {
//     next('/'); // Rediriger vers la page d'accueil (ou toute autre page publique)
//   } else {
//     next(); // Permettre l'accès à la page
//   }
// });

export default router