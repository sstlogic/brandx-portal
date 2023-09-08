<template>
  <div class="gray-card-yellow-border pa-4">
    <v-fade-transition group hide-on-leave>
      <div v-if="!loading" :key="1">
        <div class="font-weight-bold">You will be charged for this booking:</div>
        <div>
          <strong>
            <span class="text-capitalize">{{ price.useType === 'performance' ? 'event' : price.useType }}</span> Rate
            Applied:</strong
          >
          {{ formatPrice(price.rate) }}/hour ({{ price.rateType }} rate)
        </div>
        <div><strong>Total Hours:</strong> {{ price.duration }}</div>
        <div><strong>Amount Due:</strong> {{ formatPrice(price.price) }}</div>
      </div>
      <v-skeleton-loader type="text@3" v-else :key="2" class="py-2" />
    </v-fade-transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@/plugins/composition';
import { PriceResult } from '@/composables/useBookedResources/types';
import { formatPrice } from '@/utils/number';

export default defineComponent({
  name: 'QuoteCard',
  props: {
    price: {
      type: Object as PropType<PriceResult>,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      formatPrice,
    };
  },
});
</script>

<style></style>
