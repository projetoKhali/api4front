import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/md-light-deeppurple/theme.css';

createApp(App).use(router).use(PrimeVue).mount('#app');
