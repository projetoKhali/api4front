import { createRouter, createWebHistory } from 'vue-router';
import PartnerDashboard from '../views/PartnerDashboard.vue';
import TrackDashboard from '../views/TrackDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'FilterTest',
    component: () => import('../views/FilterTest.vue'),
  },
  {
    path: '/partner',
    name: 'Partner',
    component: PartnerDashboard,
  },
  {
    path: '/track',
    name: 'Track',
    component: TrackDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
