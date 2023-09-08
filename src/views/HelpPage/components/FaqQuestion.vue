<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      <div class="font-weight-bold">{{ title }}</div>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <slot />
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';

export default defineComponent({
  name: 'FaqQuestion',
  props: {
    title: {
      type: String,
    },
  },
});
</script>

<style></style>
