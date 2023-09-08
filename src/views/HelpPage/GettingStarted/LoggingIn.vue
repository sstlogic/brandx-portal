<template>
  <faq-question title="Log In">
    <p>Logging in is as simple as entering your email address and your 8-digit password.</p>

    <p>
      After logging in, you will be redirected to the “Artist Pass” page that displays your subscription details with a
      link to “View All My Bookings” or “Create A Booking”.
    </p>
  </faq-question>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import FaqQuestion from '../components/FaqQuestion.vue';

export default defineComponent({
  components: { FaqQuestion },
  name: 'LoggingIn',
});
</script>

<style></style>
