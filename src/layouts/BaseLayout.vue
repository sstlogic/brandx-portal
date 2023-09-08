<template>
  <component :is="currentlayout">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import { useLayout } from '@/composables/useLayout';

export default defineComponent({
  name: 'BaseLayout',
  setup() {
    const { currentlayout } = useLayout();
    return {
      currentlayout,
    };
  },
});
</script>

<style></style>
