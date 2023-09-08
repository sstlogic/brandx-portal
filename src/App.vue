<template>
  <v-app>
    <base-layout>
      <base-router />
    </base-layout>
    <confirm-dialog />
    <message-bar />
  </v-app>
</template>

<script lang="ts">
import BaseLayout from './layouts/BaseLayout.vue';
import BaseRouter from './components/BaseRouter.vue';
// import ConfirmDialog from './components/ConfirmDialog.vue';
// import MessageBar from './components/MessageBar.vue';
import { defineComponent, onMounted } from '@vue/composition-api';
import ConfirmDialog from './components/ConfirmDialog.vue';
import MessageBar from './components/MessageBar.vue';
// import { useApi } from './services/api/useApi';

export default defineComponent({
  components: {
    BaseLayout,
    BaseRouter,
    ConfirmDialog,
    MessageBar,
    // ConfirmDialog,
    // MessageBar,
  },
  name: 'App',
  setup() {
    onMounted(() => {
      console.log(new Date());
      console.log('Vue URL: '+process.env.VUE_APP_API_URL)
    });
    // onMounted(async () => {
    //   const { getCsrfCookie } = useApi();
    //   await getCsrfCookie();
    // });
  },
});
</script>
