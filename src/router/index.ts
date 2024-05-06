import { createRouter, createWebHistory } from 'vue-router';
import PartnerDashboard from '../views/PartnerDashboard.vue';
import TrackDashboard from '../views/TrackDashboard.vue';
import TableExample from '../views/TableExample.vue';
import FormExample from '../views/FormExample.vue';

const routes = [
  {
    path: '/',
    name: 'Table Test',
    component: TableExample,
  },
  {
    path: '/formExample',
    name: 'Form Popup Example',
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
