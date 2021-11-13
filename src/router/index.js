import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/components/Home.vue'),
    props: true,
  },
  {
    path: '/session/:id',
    name: 'session',
    component: () => import('@/components/Session.vue'),
    props: true,
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
