import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/watchFirstDemo',
      name: 'watchFirstDemo',
      component: () => import('../views/WatchFirstDemo.vue'),
    },
    {
      path: '/refAndReactive',
      name: 'refAndReactive',
      component: () => import('../views/RefAndReactive.vue'),
    },
    {
      path: '/watchModel',
      name: 'watchModel',
      component: () => import('../views/WatchModel.vue'),
    },
    {
      path: '/watchByPlus',
      name: 'watchByPlus',
      component: () => import('../views/WatchByPlus.vue'),
    },
    {
      path: '/watchSomeAttrs',
      name: 'watchSomeAttrs',
      component: () => import('../views/WatchSomeAttrs.vue'),
    },
    {
      path: '/watchSomeAttrs2',
      name: 'watchSomeAttrs2',
      component: () => import('../views/WatchSomeAttrs2.vue'),
    },
  ],
})

export default router
