import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Me from '@/views/Me.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/me',
    name: 'Me',
    component: Me,
  },
  {
    path: '/works',
    name: 'Works',
    component: () => import('@/views/Works.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
