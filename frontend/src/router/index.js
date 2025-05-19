import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/login.vue'
import ApiTester from ''

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/apitester', name: 'ApiTester', component: ApiTester },
  { path: '/:pathMatch(.)', redirect: '/' } // 👈 Ruta catch-all
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router