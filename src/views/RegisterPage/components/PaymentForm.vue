<template>
  <div>
    <div>
      <div class="text-h6 mt-4">Artist Pass Subscription</div>
      <p>
        Once payment is complete you will automatically be emailed your Artist Pass details which will enable you to
        login and book spaces at subsidised rates.
      </p>
    </div>

    <v-sheet max-width="45%" class="border-yellow pa-2 my-2">
      <div><strong>Organisation</strong></div>
      <div>$100</div>
      <div>Per Year, Billed Yearly</div>
    </v-sheet>

    <div>
      <p>
        <strong
          >Enter your card details. <br />
          Your subscription will start immediately.
        </strong>
      </p>
    </div>

    <div>
      <payment-input button-text="Subscribe" />
    </div>
  </div>
</template>

<script lang="ts">
import PaymentInput from '@/components/PaymentInput.vue';
import { defineComponent } from '@/plugins/composition';

export default defineComponent({
  components: { PaymentInput },
  name: 'PaymentForm',
});
</script>

<style></style>
