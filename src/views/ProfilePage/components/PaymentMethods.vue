<template>
  <div class="gray-card pa-4">
    <div class="font-weight-bold mb-4">Payment Methods</div>
    <div class="d-flex justify-space-between flex-column">
      <div class="d-flex justify-center flex-column">
        <payment-method-card
          v-for="method in paymentMethods"
          :key="method.id"
          :method="method"
          :isDefault="isDefault(method)"
          @deleted="refresh"
          @defaultChanged="refresh"
        />

        <div class="mt-2">
          <v-expand-transition>
            <payment-method-input
              v-if="adding"
              class="mb-4"
              @input="addPaymentMethod"
              @cancel="cancel"
              show-cancel
              :loading="loading"
            />
          </v-expand-transition>
          <base-button v-if="!adding" block @click="adding = true">Add Payment Method</base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@/plugins/composition';
import { usePayments } from '@/composables/usePayments';
import { PaymentMethod } from '@stripe/stripe-js';
import BaseButton from '@/components/base/BaseButton.vue';
import PaymentMethodCard from './PaymentMethodCard.vue';
import PaymentMethodInput from '@/components/PaymentMethodInput.vue';
import { useApi } from '@/composables/useApi';
import { useLoader } from '@/composables/useLoader';

export default defineComponent({
  components: { BaseButton, PaymentMethodCard, PaymentMethodInput },
  name: 'PaymentMethods',
  props: {
    showAdding: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const { getPaymentMethods, getDefaultPaymentMethod } = usePayments();
    const { loading, withLoader } = useLoader();
    const adding = ref(false);

    const { post } = useApi();

    const paymentMethods = ref<PaymentMethod[]>([]);
    const defaultMethod = ref<PaymentMethod | null>(null);

    const refresh = async () => {
      defaultMethod.value = await getDefaultPaymentMethod();
      paymentMethods.value = await getPaymentMethods();
    };

    onMounted(async () => {
      if (props.showAdding) {
        adding.value = true;
      }
      defaultMethod.value = await getDefaultPaymentMethod();
      paymentMethods.value = await getPaymentMethods();
    });

    const isDefault = (method: PaymentMethod) => {
      return method.id === defaultMethod.value?.id;
    };

    const addPaymentMethod = async (paymentMethod: string) =>
      withLoader(async () => {
        const response = await post('/payment-methods', { payment_method: paymentMethod });

        if (response) {
          adding.value = false;
          defaultMethod.value = await getDefaultPaymentMethod();
          paymentMethods.value = await getPaymentMethods();
          emit('input');
        }
      });

    const cancel = () => {
      adding.value = false;
      emit('cancel');
    };

    return {
      paymentMethods,
      defaultMethod,
      isDefault,
      adding,
      addPaymentMethod,
      loading,
      refresh,
      cancel,
    };
  },
});
</script>

<style></style>
