import { MotionPlugin } from '@vueuse/motion';
import { createApp } from 'vue';
import App from './App.vue';
import '@/assets/styles/app.scss';

const app = createApp(App);
app.use(MotionPlugin);
app.mount('#app');
