import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { colours } from './colours';
import '@/styles/index.scss';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#007BFF',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF6258',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        lightGray: {
          base: '#FBFBFB',
          darken1: '#F4F3F4',
        },
        darkGray: {
          base: '#DADADA',
          darken1: '#979797',
        },
        lightYellow: {
          base: '#FEFBE8',
          darken1: '#F4E44C',
        },
        ...colours,
      },
    },
  },
});
