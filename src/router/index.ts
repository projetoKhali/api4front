import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: null,
    },
    {
      path: '/list',
      name: 'Listagem',
      children: [
        {
          path: 'tracks',
          name: 'Tracks',
          component: () => import('../views/ListTrack.vue'),
        },
        {
          path: 'partners',
          name: 'Partners',
          component: () => import('../views/ListPartner.vue'),
        },
        {
          path: 'users',
          name: 'Users',
          component: () => import('../views/ListUser.vue'),
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      meta: { hide: true },
      children: [
        {
          path: 'track/:trackId',
          name: 'Dashboard Individual de Trilha',
          meta: { name: 'Track' },
          component: () => import('../views/TrackDashboard.vue'),
        },
        {
          path: 'partner/:partnerId',
          name: 'Dashboard Individual de Parceiro',
          meta: { name: 'Partner' },
          component: () => import('../views/PartnerDashboard.vue'),
        },
      ],
    },
    {
      path: '/comparative',
      name: 'Comparativo',
      children: [
        {
          path: 'track',
          name: 'Dashboard Comparativo de Trilhas',
          meta: { name: 'Tracks' },
          component: () => import('../views/ComparativeTracks.vue'),
        },
        {
          path: 'partner',
          name: 'Dashboard Comparativo de Parceiros',
          meta: { name: 'Partners' },
          component: () => import('../views/ComparativePartner.vue'),
        },
      ],
    },
    {
      path: '/report',
      name: 'Relatório',
      children: [
        {
          path: 'track',
          name: 'Relatório de Trilhas',
          meta: { name: 'Tracks' },
          component: () => import('../views/ReportTrack.vue'),
        },
        {
          path: 'partner',
          name: 'Relatório de Parceiros',
          meta: { name: 'Partners' },
          component: () => import('../views/ReportPartner.vue'),
        },
      ],
    },
  ],
});

export function getListPath(context: string): string {
  return `${
    router?.options?.routes
      ?.find((route: RouteRecordRaw) => route.path === '/list')
      ?.children?.find(route => route.path.includes(context))?.path || ''
  }/`;
}

export default router;
