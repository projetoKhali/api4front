import { createRouter, createWebHistory } from 'vue-router';
import PartnerDashboard from '../views/PartnerDashboard.vue';
import TrackDashboard from '../views/TrackDashboard.vue';
import TableExample from '../views/TableExample.vue';
import ListPartner from '../views/ListPartner.vue';
import ListUser from '../views/ListUser.vue';
import ListTrack from '../views/ListTrack.vue';
import PopupExample from '../views/PopupExample.vue';
import FormExample from '../views/FormExample.vue';

const routes = [
  {
    path: '/track/:trackId',
    name: 't',
    component: TrackDashboard,
  },
  {
    path: '/listtrack',
    name: 'Tracks',
    component: ListTrack,
  },
  {
    path: '/partners',
    name: 'Partners',
    component: ListPartner,
  },
  {
    path: '/users',
    name: 'Users',
    component: ListUser,
  },
  {
    path: '/partner/:partnerId',
    name: ' ',
    component: PartnerDashboard,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
