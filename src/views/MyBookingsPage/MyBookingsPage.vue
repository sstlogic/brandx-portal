<template>
  <member-page title="My Bookings">
    <template #header>
      <v-tabs background-color="lightGray" color="black" fixed-tabs slider-size="4" v-model="tab">
        <v-tab class="tab font-weight-bold text-capitalize">Upcoming</v-tab>
        <v-tab class="tab font-weight-bold text-capitalize">Past</v-tab>
      </v-tabs>
    </template>

    <reservation-card v-for="res in filteredReservations" :key="res.referenceNumber" :reservation="res" />
    <div class="px-2">
      <base-button @click="goToPendingBookings" black block>Create a Booking</base-button>
    </div>
  </member-page>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { computed, defineComponent, onMounted, ref } from '@/plugins/composition';
import { routeNames } from '@/router/routeNames';
import { useRouter } from '@/router/useRouter';
import { getBookedReservations } from '@/composables/useBookedResources/useBookedReservations';
import { Reservation } from '@/models/booked/Reservation';
import MemberPage from '@/layouts/MemberLayout/MemberPage.vue';
import ReservationCard from './components/ReservationCard.vue';
import { isBefore, parseISO } from 'date-fns';

export default defineComponent({
  components: { BaseButton, MemberPage, ReservationCard },
  name: 'MyBookingsPage',

  setup() {
    const { router } = useRouter();
    const reservations = ref<Reservation[]>([]);
    const filteredReservations = computed(() => {
      const now = new Date();
      if (tab.value === 1) {
        return reservations.value.filter((res: Reservation) => {
          return isBefore(parseISO(res.startDate), now);
        });
      }

      return reservations.value.filter((res: Reservation) => {
        return !isBefore(parseISO(res.startDate), now);
      });
    });

    const tab = ref(0);

    onMounted(async () => {
      reservations.value = await getBookedReservations();
    });

    const goToPendingBookings = () => {
      router.push({ name: routeNames.spaces.book });
    };

    return {
      goToPendingBookings,
      reservations,
      tab,
      filteredReservations,
    };
  },
});
</script>

<style lang="scss" scoped>
.tab {
  font-size: 1.125rem;
}
</style>
