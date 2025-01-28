import {createRouter, createWebHistory} from 'vue-router';
import LoginPage from "./pages/Login.vue";
import RegisterPage from "./pages/Register.vue";
const routes = [
    {path: '/login', component: LoginPage},
    {path: '/register', component: RegisterPage},
];
const Routes =  createRouter({
    history: createWebHistory(),
    routes,
})

export default Routes