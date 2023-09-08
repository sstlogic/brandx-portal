<template>
  <faq-question title="My Profile">
    <p>
      The information in your profile is important. Incorrect information will lead to bookings not being registered and
      confirmed. Please make sure that all the information in “My Profile” is correct so you can experience full access
      to the Booking Calendar service.
    </p>

    <p>
      “My Profile” is located in the menu on the top right hand side of the screen (indicated by three horizontal
      lines).
    </p>

    <p>
      Information in your profile includes your name, address, contact numbers, email, artform and password for access
      to the Bookings Calendar. It also includes the date of when your membership will expire and whether you want to
      receive <strong>Brand X</strong> news or information on promotions and special deals.
    </p>

    <p>
      This information will be used by <strong>Brand X</strong> to maintain contact with you and to generate receipts
      from the bookings you have requested.
    </p>
  </faq-question>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import FaqQuestion from '../components/FaqQuestion.vue';

export default defineComponent({
  components: { FaqQuestion },
  name: 'MyProfile',
});
</script>

<style></style>
