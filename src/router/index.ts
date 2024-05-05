import { createRouter, createWebHistory } from 'vue-router';
import PartnerDashboard from '../views/PartnerDashboard.vue';
import TrackDashboard from '../views/TrackDashboard.vue';
import TableExample from '../views/TableExample.vue';
import ListPartner from '../views/ListPartner.vue';
import ListUser from '../views/ListUser.vue';

const routes = [
  {
    path: '/tableExamplo',
    name: 'Table Test',
    component: TableExample,
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
  {
    path: '/partners',
    name: 'partners',
    component: ListPartner,
  },
  {
    path: '/users',
    name: 'users',
    component: ListUser,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
