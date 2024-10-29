// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/LoginRegister',
    name: 'LoginRegister',
    component: () => import('@/views/LoginRegister.vue'),
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import('@/views/Search.vue'),
  },
  {
    path: '/Planning',
    name: 'Planning',
    component: () => import('@/views/PersonnalSpace.vue'),
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/AdminPanel',
    name: 'AdminPanel',
    component: () => import('@/views/AdminPanel.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
