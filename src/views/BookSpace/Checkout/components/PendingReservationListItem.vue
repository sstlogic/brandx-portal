<template>
  <div class="mt-2">
    <div class="font-weight-bold">{{ reservation.resourceName }}</div>
    <div class="my-1">
      <strong v-for="(date, i) in reservation.dates" :key="i">
        {{ formatTimeRange(date.start, date.end) }}
      </strong>
    </div>
    <div>
      <strong>
        <span class="text-capitalize">{{ reservation.useType === 'performance' ? 'event' : reservation.useType }}</span>
        Rate Applied:</strong
      >
      {{ formatPrice(reservation.rate) }}
    </div>
    <div><strong>Total Hours:</strong> {{ reservation.duration }}</div>

    <div class="d-flex">
      <div><strong>Amount Due:</strong> {{ formatPrice(reservation.price) }}</div>
      <v-spacer />
      <v-chip label small color="error" class="font-weight-bold" @click="cancel">Delete</v-chip>
    </div>
  </div>
</template>

<script lang="ts">
import { PendingReservation } from '@/composables/useBookedResources/types';
import { defineComponent, PropType } from '@/plugins/composition';
import { formatPrice } from '@/utils/number';
import { formatTimeRange } from '@/utils/date';
import { useApi } from '@/composables/useApi';

export default defineComponent({
  name: 'PendingReservationListItem',
  props: {
    reservation: {
      type: Object as PropType<PendingReservation>,
      required: true,
    },
    index: {
      type: Number,
      required: false,
    },
  },
  setup(props, { emit }) {
    const cancel = async () => {
      const { $delete } = useApi();

      await $delete(`/reservations/${props.reservation.uuid}`);

      emit('deleted');
    };
    return {
      formatPrice,
      formatTimeRange,
      cancel,
    };
  },
});
</script>

<style></style>
