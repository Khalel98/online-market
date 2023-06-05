import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/v-cart.vue')
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import( '../views/v-favorites.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router
