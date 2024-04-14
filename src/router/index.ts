import { createRouter, createWebHistory } from 'vue-router';
import Example from '../views/Example.vue';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => Home,
  },
  {
    path: '/example',
    name: 'Example',
    component: Example,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
