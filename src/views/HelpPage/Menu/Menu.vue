<template>
  <faq-topic title="Menu">
    <p>
      The menu displays the key tools required to navigate the Booking Calendar. The menu is located on the top right
      hand side of the screen (indicated by three horizontal lines).
    </p>

    <template #questions>
      <tools />
    </template>
  </faq-topic>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import FaqTopic from '../components/FaqTopic.vue';
import Tools from './Tools.vue';

export default defineComponent({
  components: { FaqTopic, Tools },
  name: 'Menu',
});
</script>

<style></style>
