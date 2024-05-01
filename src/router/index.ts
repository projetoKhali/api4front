import { createRouter, createWebHistory } from 'vue-router';
import PartnerDashboard from '../views/PartnerDashboard.vue';
import TrackDashboard from '../views/TrackDashboard.vue';
import FormExample from '../views/FormExample.vue';

const routes = [
  {
    path: '/',
    name: 'Form Example',
    component: FormExample,
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
