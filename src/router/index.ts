import { createRouter, createWebHistory } from 'vue-router';
import PartnerDashboard from '../views/PartnerDashboard.vue';
import TrackDashboard from '../views/TrackDashboard.vue';

<<<<<<< Updated upstream
const routes = [
  {
=======
const routes = {
  dashboard: [
    {
>>>>>>> Stashed changes
    path: '/partner',
    name: 'Partner',
    component: PartnerDashboard,
  },
  {
    path: '/track',
    name: 'Track',
    component: TrackDashboard,
  }  
],
  listagem: [
    {
      path: '/partner',
      name: 'Partner',
      component: PartnerDashboard,
    },
    {
      path: '/track',
      name: 'Track',
      component: TrackDashboard,
    }  
  ]
  };

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...routes.dashboard,
    ...routes.listagem,
  ]
});

export default router;
