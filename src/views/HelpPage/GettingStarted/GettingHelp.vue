<template>
  <faq-question title="Getting Help">
    For further assistance with using the online calendar contact <strong>Brand X</strong> on bookings@brandx.org.au.
  </faq-question>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import FaqQuestion from '../components/FaqQuestion.vue';

export default defineComponent({
  components: { FaqQuestion },
  name: 'GettingHelp',
});
</script>

<style></style>
