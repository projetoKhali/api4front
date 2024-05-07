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
    path: '/tableExamplo',
    name: 'Table Test',
    component: PopupExample,
  },
  {
    path: '/formExample',
    name: 'Form Popup Example',
    component: FormExample,
  },
  {
    path: '/partner/:partnerId',
    name: 'Partner',
    component: PartnerDashboard,
  },
  {
    path: '/listtrack',
    name: 'List Track',
    component: ListTrack,
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
