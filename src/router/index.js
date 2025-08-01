import { createRouter, createWebHistory } from 'vue-router'
import CaseManagement from '@/views/CaseManagement.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: CaseManagement
  },
  {
    path: '/consultar',
    name: 'Consultar',
    component: CaseManagement
  },
  {
    path: '/registrar',
    name: 'Registrar',
    component: () => import('@/views/RegisterCase.vue')
  },
  {
    path: '/caso/:id',
    name: 'CaseDetail',
    component: CaseManagement,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
