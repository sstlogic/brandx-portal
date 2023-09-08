<template>
  <div class="gray-card pa-2 my-2">
    <div class="d-flex justify-space-between align-center">
      <div>
        <div>
          <span class="font-weight-bold">{{ date }}</span
          >,
          {{ time }}
        </div>
        <div>{{ reservation.resourceName }}</div>
      </div>
      <v-btn icon @click="toggleExpand">
        <v-icon large>{{ expanded ? 'mdi-menu-down' : 'mdi-menu-right' }}</v-icon>
      </v-btn>
    </div>
    <v-expand-transition>
      <div v-show="expanded" class="pt-4">
        <div>
          <div class="font-weight-bold">Description</div>
          <div>{{ reservation.description }}</div>
        </div>
        <div class="d-flex justify-space-between align-center">
          <v-spacer />
          <base-button @click="update" v-if="canUpdate">Update</base-button>
        </div>
      </div>
    </v-expand-transition>

    <update-booking :reservation="updating" v-if="updating" @input="updating = null" />
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { Reservation } from '@/models/booked/Reservation';
import { computed, defineComponent, PropType, ref } from '@/plugins/composition';
import { formatDate, formatTimeRange } from '@/utils/date';
import { isBefore, parseISO } from 'date-fns';
import UpdateBooking from './UpdateBooking.vue';

export default defineComponent({
  components: { BaseButton, UpdateBooking },
  name: 'ReservationCard',
  props: {
    reservation: {
      type: Object as PropType<Reservation>,
      required: true,
    },
    noUpdate: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const expanded = ref(false);
    const updating = ref<Reservation | null>(null);

    const toggleExpand = () => {
      expanded.value = !expanded.value;
    };
    const date = computed(() => {
      return formatDate(props.reservation.startDate);
    });
    const time = computed(() => {
      return formatTimeRange(props.reservation.startDate, props.reservation.endDate, true);
    });
    const update = () => {
      updating.value = props.reservation;
    };

    const canUpdate = computed(() => {
      return !isBefore(parseISO(props.reservation.startDate), new Date()) && !props.noUpdate;
    });

    return {
      time,
      expanded,
      date,
      toggleExpand,
      update,
      updating,
      canUpdate,
    };
  },
});
</script>

<style></style>
