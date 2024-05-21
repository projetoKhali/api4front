import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

interface Route {
  path: string;
  name: string;
  hide?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  component: Function;
}

const routes: Route[] = [
  {
    path: '/',
    name: 'FilterTest',
    component: () => import('../views/FilterTest.vue'),
  },
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
  {
    path: '/compartive/track',
    name: 'Compartive Track',
    component: () => import('../views/ComparativeTracks.vue'),
  },
  {
    path: '/compartive/partner',
    name: 'Compartive Partner',
    component: () => import('../views/ComparativePartner.vue'),
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
