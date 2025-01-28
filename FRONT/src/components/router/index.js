// src/components/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
// import Login from '../Signup.vue'  
// import Welcome from '../Accueil.vue'
// import Sign_up from '../Signup.vue'
// import Sign_in from '../Signin.vue'
import Main from '../Main.vue'

const routes = [
  // { path: '/', component: Welcome },
  // { path: '/Signup', component: Sign_up },
  // { path: '/Signin', component: Sign_in },
  { path: '/Main', component: Main , meta: { requiresAuth: true }},

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