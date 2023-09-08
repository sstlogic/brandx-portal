<template>
  <faq-question title="Making A Booking">
    <p>
      To make a booking, choose your booking start time by clicking on the available space in a calendar indicated by
      the yellow +. Then choose your end time by clicking a future yellow + on the same day. Your selection will now be
      a solid yellow with details on the booking displayed at the bottom on the screen. If correct, click “Continue”. If
      not correct, click “X” and repeat the above process.
    </p>

    <p>
      Next you'll be taken to a Confirm Booking screen where you'll be prompted to describe your activity and to
      indicate special instructions including equipment requirements. Under this you are required to indicate the number
      of people who will be attending this booking (including yourself) and to select the statements that apply to your
      booking.
    </p>

    <p>
      A message will display the rate, hours and charge for the booking which is accepted by clicking “Confirm Booking”.
      A pop-up screen will notify you that this booking will be held for 10-minutes if you wish to “Add A Booking”
      (where you'll return to the calendar to add another booking) or “Pay Now” (where you'll commence the payment
      process to secure your booking.
    </p>

    <p>All bookings must adhere to the studio's Terms and Conditions.</p>
  </faq-question>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import FaqQuestion from '../components/FaqQuestion.vue';

export default defineComponent({
  components: { FaqQuestion },
  name: 'MakingABooking',
});
</script>

<style></style>
