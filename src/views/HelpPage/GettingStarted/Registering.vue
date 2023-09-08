<template>
  <faq-question title="Registering">
    <p>
      Only when the completed registration is submitted and the appropriate fee has been paid will access to the Booking
      Calendar become active.
    </p>

    <p>
      You will receive an email confirming your username and password with instructions on how to access the Booking
      Calendar and ticket discounts from <strong>Brand X</strong>.
    </p>
  </faq-question>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import FaqQuestion from '../components/FaqQuestion.vue';

export default defineComponent({
  components: { FaqQuestion },
  name: 'Registering',
});
</script>

<style></style>
