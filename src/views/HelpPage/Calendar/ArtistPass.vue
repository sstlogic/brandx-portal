<template>
  <faq-question title="Artist Pass Version">
    <p>
      The Artist Pass view version is only accessible to Artist Pass subscribers and is where you can view all confirmed
      and available times across our studio portfolio. The dates displayed begin with the “Search Date from Week
      Commencing” value and extend for 7 (default) days. The calendars are colour coded to indicate “Available”,
      “Booked” “Closed” and when a subscriber is placing bookings, “Your Selection”.
    </p>
  </faq-question>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import FaqQuestion from '../components/FaqQuestion.vue';

export default defineComponent({
  components: { FaqQuestion },
  name: 'ArtistPass',
});
</script>

<style></style>
