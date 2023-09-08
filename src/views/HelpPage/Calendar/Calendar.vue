<template>
  <faq-topic title="Using the Booking Calendar">
    <p>
      There are two versions of the calendar - “View-Only” or “Artist Pass” view depending on whether you have an Artist
      Pass and are logged in to the <strong>Brand X</strong> Booking Calendar.
    </p>

    <template #questions>
      <view-only />
      <artist-pass />
      <type-of-space />
      <make-a-booking />
      <payment />
      <morify-delete />
    </template>
  </faq-topic>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import FaqTopic from '../components/FaqTopic.vue';
import ArtistPass from './ArtistPass.vue';
import MakeABooking from './MakeABooking.vue';
import MorifyDelete from './MorifyDelete.vue';
import Payment from './Payment.vue';
import TypeOfSpace from './TypeOfSpace.vue';
import ViewOnly from './ViewOnly.vue';

export default defineComponent({
  components: {
    FaqTopic,
    ViewOnly,
    ArtistPass,
    TypeOfSpace,
    MakeABooking,
    Payment,
    MorifyDelete,
  },
  name: 'GettingStarted',
});
</script>

<style></style>
