<template>
  <faq-question title="Modifying/Deleting a Reservation">
    <p>
      To modify or delete a confirmed booking, click “My Bookings” from the menu which is located on the top right hand
      side of the screen (indicated by three horizontal lines). When you click on the arrow next to the listed booking
      you wish to modify, you can request changes to these bookings by clicking “Update”. An email form will ask you to
      include information on your request. Allow 24 hours for <strong>Brand X</strong> to confirm your request.
    </p>
  </faq-question>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import FaqQuestion from '../components/FaqQuestion.vue';

export default defineComponent({
  components: { FaqQuestion },
  name: 'ModifyDelete',
});
</script>

<style></style>
