import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

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
    hide: true,
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
    hide: true,
    component: () => import('../views/PartnerDashboard.vue'),
  },
];

const routeRecordsRaw: RouteRecordRaw[] = routes
  .filter((route: Route) => !route.hide)
  .map((route: Route) => ({
    path: route.path,
    name: route.name,
    component: route.component,
  }));

const router = createRouter({
  history: createWebHistory(),
  routes: routeRecordsRaw,
});

export default router;
