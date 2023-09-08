<template>
  <div class="mb-8">
    <div class="font-weight-bold text-h5 mt-8 mb-4 text-left">{{ title }}</div>

    <div class="mb-4">
      <slot />
    </div>
    <v-expansion-panels>
      <slot name="questions" />
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';

export default defineComponent({
  name: 'FaqTopic',
  props: {
    title: {
      type: String,
    },
  },
});
</script>

<style></style>
