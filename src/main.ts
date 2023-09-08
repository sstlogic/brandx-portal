import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

import { createApp } from './plugins/composition';
import Vue, { VNode, VueConstructor } from 'vue';

Vue.config.productionTip = false;

const app = createApp({
  router,
  vuetify,
  render: (h: (a: VueConstructor<Vue>) => VNode) => h(App as VueConstructor<Vue>),
});

app.mount('#app');
