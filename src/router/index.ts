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
  {
    path: '/services',
    name: 'Services',
    component: () => import('@/views/Services.vue'),
  },
  {
    path: '/services/capital-calc',
    name: 'CapitalCalc',
    component: () => import('@/views/CapitalCalc.vue'),
  },
  {
    path: '/wiki',
    name: 'Wiki',
    component: () => import('@/views/Wiki.vue'),
  },
  {
    path: '/wiki/:category/:slug',
    name: 'WikiArticle',
    component: () => import('@/views/WikiArticle.vue'),
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
