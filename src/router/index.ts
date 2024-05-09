import { createRouter, createWebHistory } from 'vue-router';

interface Route {
  path: string;
  name: string;
  hide?: boolean;
  component: Function;
}

const routes: Route[] = [
  {
    path: '/track/:trackId',
    name: 'Track Dashboard',
    component: () => import('../views/TrackDashboard.vue'),
  },
  {
    path: '/tracks',
    name: 'Tracks',
    component: () => import('../views/ListTrack.vue'),
  },
  {
    path: '/partners',
    name: 'Partners',
    component: () => import('../views/ListPartner.vue'),
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/ListUser.vue'),
  },
  {
    path: '/partner/:partnerId',
    name: 'Partner Dashboard',
    component: () => import('../views/PartnerDashboard.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
