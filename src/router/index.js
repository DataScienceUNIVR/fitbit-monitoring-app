import { createRouter, createWebHistory } from '@ionic/vue-router';
// import { RouteRecordRaw } from 'vue-router';
// import Home from '../views/Home.vue'
import MemoriesPage from "../pages/MemoriesPage.vue";

const routes = [
  {
    path: '/',
    redirect: '/memories'
  },
  {
    path: '/memories',
    component: MemoriesPage
  },
  {
    path: '/memories/:id',
    // Lazy loading, this component will be downloaded only if really needed
    component: () => import('/src/pages/MemoryDetails.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
