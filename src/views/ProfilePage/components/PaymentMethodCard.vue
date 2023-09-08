<template>
  <div class="mb-4 d-flex align-center">
    <!-- <div class="mr-2 py-2 px-1 card-image rounded">
      <v-img :src="require('@/assets/cards/visa.png')" width="25px" />
    </div> -->
    <div>Ending in {{ method.card.last4 }}</div>
    <v-chip label small class="font-weight-medium ml-2" v-if="!isDefault" @click="makeDefault" :disabled="loading"
      >Make Default</v-chip
    >
    <v-chip label small color="yellow" class="font-weight-medium ml-2" v-if="isDefault">Default</v-chip>
    <v-chip
      label
      small
      color="error"
      class="font-weight-medium ml-2"
      v-if="!isDefault"
      @click="destroy"
      :disabled="loading"
    >
      <v-icon small>mdi-delete</v-icon>
    </v-chip>
    <v-progress-circular class="ml-2" v-if="loading" size="18" indeterminate color="black" />
  </div>
</template>

<script lang="ts">
import { useApi } from '@/composables/useApi';
import { useLoader } from '@/composables/useLoader';
import { defineComponent, PropType } from '@/plugins/composition';
import { PaymentMethod } from '@stripe/stripe-js';

export default defineComponent({
  name: 'PaymentMethodCard',
  props: {
    method: {
      type: Object as PropType<PaymentMethod>,
      required: true,
    },
    isDefault: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { loading, withLoader } = useLoader();
    const { post, $delete } = useApi();

    const destroy = async () =>
      withLoader(async () => {
        const response = await $delete(`/payment-methods/${props.method.id}`);
        if (response) {
          emit('deleted');
        }
      });

    const makeDefault = async () =>
      withLoader(async () => {
        const response = await post('/payment-methods/default', {
          id: props.method.id,
        });

        if (response) {
          emit('defaultChanged');
        }
      });

    return {
      destroy,
      makeDefault,
      loading,
    };
  },
});
</script>

<style></style>
