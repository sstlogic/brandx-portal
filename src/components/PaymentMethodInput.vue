<template>
  <div class="mt-4">
    <v-text-field v-model="name" dense hide-details="auto" label="Card Holder Name" outlined />
    <div id="card-element" class="my-4"></div>
    <div class="d-flex mt-4">
      <base-button @click="cancel" v-if="showCancel" :disabled="isLoading">Cancel</base-button>
      <v-spacer />
      <base-button @click="subscribe" :disabled="!valid" :loading="isLoading">{{ buttonText }}</base-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from '@/plugins/composition';
import { StripeElementCard } from '@vue-stripe/vue-stripe';
import { loadStripe, SetupIntent, Stripe, StripeCardElement, StripeElements } from '@stripe/stripe-js';
import BaseButton from './base/BaseButton.vue';
import { usePayments } from '@/composables/usePayments';
import { useApi } from '@/composables/useApi';
import { useLoader } from '@/composables/useLoader';

export default defineComponent({
  name: 'PaymentMethodInput',
  components: {
    StripeElementCard,
    BaseButton,
  },
  props: {
    buttonText: {
      type: String,
      default: 'Add',
    },
    showCancel: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
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

    const { getSetupIntent } = usePayments();
    const { post } = useApi();
    const { loading, withLoader } = useLoader();

    const setupStripe = async () => {
      stripe.value = (await loadStripe(process.env.VUE_APP_STRIPE_KEY)) as Stripe;

      const cardOptions = {
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
          // console.log({ error });
        } else {
          emit('input', setupIntent?.payment_method);
        }
      });

    const isLoading = computed(() => {
      return props.loading || loading.value;
    });

    const cancel = () => {
      emit('cancel');
    };

    return {
      intent,
      subscribe,
      name,
      valid,
      cancel,
      isLoading,
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
