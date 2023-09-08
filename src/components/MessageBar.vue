<template>
  <v-snackbar v-model="show" bottom multi-line :timeout="-1" :color="isError ? 'error' : 'yellow'">
    <span class="font-weight-bold" :class="isError ? 'white--text' : 'black--text'">{{ message }}</span>
    <template v-if="isError" v-slot:action="{ attrs }">
      <!-- <v-btn color="red" text v-bind="attrs" @click="show = false"> Close </v-btn> -->
      <base-button v-bind="attrs" :to="{ name: routeNames.contact }" @click="show = false" black class="mr-2">
        Contact Us</base-button
      >
      <base-button v-bind="attrs" @click="show = false" black> Close</base-button>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@/plugins/composition';
import { useStatus } from '@/composables/useStatus';
import BaseButton from './base/BaseButton.vue';
import { routeNames } from '@/router/routeNames';

export default defineComponent({
  components: { BaseButton },
  name: 'MessageBar',
  setup() {
    const show = ref(false);

    const { message, isError } = useStatus();

    watch(message, (val) => {
      show.value = !!val;
    });

    return {
      show,
      message,
      isError,
      routeNames,
    };
  },
});
</script>

<style></style>
