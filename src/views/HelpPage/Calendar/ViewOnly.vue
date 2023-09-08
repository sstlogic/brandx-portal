<template>
  <faq-question title="View-only Version">
    <p>
      Anyone can view the view-only version of the calendar which is displayed below the login instructions. This
      version of the booking calendar will show you the availability of the spaces, but you will not be able to place
      bookings. You can “Select A Space” from the drop down menu to refresh the display to view availability for the
      type of spaces in the <strong>Brand X</strong> studio portfolio. In addition, you can select “Show Dates From”
      which will refresh the calendars to display 7-days from the selected date.
    </p>
  </faq-question>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import FaqQuestion from '../components/FaqQuestion.vue';

export default defineComponent({
  components: { FaqQuestion },
  name: 'ViewOnly',
});
</script>

<style></style>
