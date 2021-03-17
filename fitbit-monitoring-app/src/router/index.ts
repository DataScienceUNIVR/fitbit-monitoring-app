import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/main',
    component: () => import ('../views/Main.vue')
  },
  {
    path: '/main/:id',
    component: () => import ('../views/Main.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
