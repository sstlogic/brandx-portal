<template>
  <faq-question title="Secure Payment">
    <p>To secure your booking with <strong>Brand X</strong> a payment must be made using your credit or debit card.</p>

    <p>
      The “Payment Summary” details your pending bookings and their associated charges. You can remove these bookings by
      clicking “Delete”.
    </p>

    <p>
      If you have previously entered a payment method, click “Pay Now” for your credit or debit card to be processed by
      the third-party merchant Stripe. If you have not entered a payment method click “Add Payment Method” to enter your
      card details (which will be stored on our system) and then “Pay Now”.
    </p>

    <p>
      Once payment is complete you will receive a confirmation of payment and your booking details in your email. These
      bookings will also be recorded in the “My Bookings” list available from the menu which is located on the top right
      hand side of the screen (indicated by three horizontal lines).
    </p>
  </faq-question>
</template>

<script lang="ts">
import { defineComponent } from '@/plugins/composition';
import FaqQuestion from '../components/FaqQuestion.vue';

export default defineComponent({
  components: { FaqQuestion },
  name: 'Payment',
});
</script>

<style></style>
