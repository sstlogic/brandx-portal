<template>
  <div class="mt-4">
    <v-expand-transition>
      <div v-show="!loading">
        <v-text-field v-model="name" dense hide-details="auto" label="Card Holder Name" outlined />
        <div id="card-element" class="my-4"></div>
        <v-expand-transition>
          <div v-if="paymentError" class="error--text">{{ paymentError }}</div>
        </v-expand-transition>
      </div>
    </v-expand-transition>
    <div class="d-flex mt-4">
      <v-spacer />
      <base-button @click="subscribe" :disabled="!valid" :loading="loading">{{ buttonText }}</base-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from '@/plugins/composition';
import { StripeElementCard } from '@vue-stripe/vue-stripe';
import {
  loadStripe,
  SetupIntent,
  Stripe,
  StripeCardElement,
  StripeCardElementOptions,
  StripeElements,
} from '@stripe/stripe-js';
import BaseButton from './base/BaseButton.vue';
import { usePayments } from '@/composables/usePayments';
import { useApi } from '@/composables/useApi';
import { useLoader } from '@/composables/useLoader';
import { SubscribedResponse } from '@/composables/useBookedResources/types';

export default defineComponent({
  name: 'PaymentInput',
  components: {
    StripeElementCard,
    BaseButton,
  },
  props: {
    buttonText: {
      type: String,
      default: 'Pay Now',
    },
  },
  setup(props, { emit }) {
    const stripe = ref<Stripe | null>(null);
    const intent = ref<SetupIntent | null>(null);
    const card = ref<StripeCardElement | null>(null);
    const name = ref('');
    const cardComplete = ref(false);
    const valid = computed(() => {
      return name.value.length > 0 && cardComplete.value;
    });
    const paymentError = ref<string | null>(null);

    const { getSetupIntent } = usePayments();
    const { post } = useApi();
    const { loading, withLoader } = useLoader();

    const setupStripe = async () => {
      stripe.value = (await loadStripe(process.env.VUE_APP_STRIPE_KEY)) as Stripe;

      const cardOptions: StripeCardElementOptions = {
        hidePostalCode: true,
        style: {
          base: {
            fontSize: '16px',
            fontFamily: 'Roboto, sans-serif',
            textTransform: 'capitalize',
            fontWeight: 300,
          },
        },
      };

      const elements = stripe.value.elements() as StripeElements;
      card.value = elements.create('card', cardOptions);
      card.value.mount('#card-element');

      card.value.on('change', function (e) {
        cardComplete.value = e.complete;
      });
    };

    const setPaymentIntent = async () => {
      intent.value = (await getSetupIntent()).intent;
    };

    onMounted(async () => {
      await setPaymentIntent();
      await setupStripe();
    });

    const subscribe = async () =>
      withLoader(async () => {
        const _stripe = stripe.value as Stripe;
        const { setupIntent, error } = await _stripe.confirmCardSetup(intent.value?.client_secret ?? '', {
          payment_method: {
            card: card.value as StripeCardElement,
            billing_details: { name: name.value },
          },
        });

        if (error) {
          paymentError.value = error.message ?? null;
        } else {
          const subscribed = await post<SubscribedResponse>('/subscriptions', {
            paymentMethodId: setupIntent.payment_method,
          });
          if (subscribed) {
            emit('success', subscribed);
          }
        }
      });

    return {
      intent,
      subscribe,
      name,
      valid,
      loading,
      paymentError,
    };
  },
});
</script>

<style scoped lang="scss">
#card-element {
  border-color: rgba(0, 0, 0, 0.38);
  border-width: 1px;
  border-style: solid;
  padding: 8px 8px;
}
</style>
