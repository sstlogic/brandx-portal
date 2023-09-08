<template>
  <div>
    <p>
      Hi Sam! 👋

      Which of these options best describes you?

      <!-- TODO Renew Pass Link -->
    <p>
      Had an Artist Pass in the past? <router-link :to="{ name: routeNames.auth.login }">Log in</router-link> to renew
      your Artist Pass
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import { routeNames } from '@/router/routeNames';

export default defineComponent({
  name: 'RegisterText',
  setup() {
    return {
      routeNames,
    };
  },
});
</script>

<style></style>
