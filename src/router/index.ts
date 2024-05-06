import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'FilterTest',
    component: () => import('../views/FilterTest.vue'),
  },
  {
    path: '/tableTest',
    name: 'Table Test',
    component: () => import('../views/TableExample.vue')
  },
  {
    path: '/partner',
    name: 'Partner',
    component: () => import('../views/PartnerDashboard.vue'),
  },
  {
    path: '/track',
    name: 'Track',
    component: () => import('../views/TrackDashboard.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
