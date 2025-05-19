// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import login from '../components/login.vue'
import Menu from '../components/Menu.vue'
import SeleccionHerramientas from '../components/SeleccionHerramienta.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: login,
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu,
  },
  {
    path: '/herramienta',
    name: 'Herramientas',
    component: SeleccionHerramientas,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;