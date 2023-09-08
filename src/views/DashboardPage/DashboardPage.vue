<template>
  <member-page title="Artist Pass">
    <div class="px-4 py-2">
      <div class="d-flex justify-space-between gray-card pa-4">
        <div class="d-flex justify-center flex-column flex-shrink-1 overflow-auto mr-2">
          <div>{{ user.data.firstName }} {{ user.data.lastName }}</div>
          <div>{{ user.data.email }}</div>
          <div>{{ user.data.phone }}</div>
          <div v-if="user.data.memberExpiry">Member expiry: {{ formatDate(user.data.memberExpiry) }}</div>
        </div>
        <div class="d-flex justify-center flex-column">
          <base-button @click="editProfile">Edit</base-button>
        </div>
      </div>
      <div class="font-weight-bold text-h5 py-4">Bookings</div>

      <reservation-card v-for="res in filteredReservations" :key="res.referenceNumber" :reservation="res" no-update />

      <div>
        <base-button block class="mb-2" :to="{ name: routeNames.my.bookings }">View All My Bookings</base-button>
        <base-button block black @click="createBooking" v-if="isMember">Create a Booking</base-button>
        <base-button block black :to="{ name: routeNames.profile.subscribe }" v-if="!isMember"
          >Get Artist Pass To Make Bookings</base-button
        >
      </div>
    </div>
  </member-page>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { useAuthStore } from '@/composables/useAuthStore';
import { getBookedReservations } from '@/composables/useBookedResources/useBookedReservations';
import MemberPage from '@/layouts/MemberLayout/MemberPage.vue';
import { Reservation } from '@/models/booked/Reservation';
import { computed, defineComponent, onMounted, ref } from '@/plugins/composition';
import { routeNames } from '@/router/routeNames';
import { useRouter } from '@/router/useRouter';
import { isBefore, parseISO } from 'date-fns';
import ReservationCard from '../MyBookingsPage/components/ReservationCard.vue';
import { formatDate } from '@/utils/date';

export default defineComponent({
  components: { BaseButton, MemberPage, ReservationCard },
  name: 'DashboardPage',
  setup() {
    const { user, isMember } = useAuthStore();

    const { router } = useRouter();

    const reservations = ref<Reservation[]>([]);

    const filteredReservations = computed(() => {
      const now = new Date();

      return reservations.value
        .filter((res: Reservation) => {
          return !isBefore(parseISO(res.startDate), now);
        })
        .slice(0, 3);
    });

    onMounted(async () => {
      reservations.value = await getBookedReservations();
    });

    return {
      user,
      editProfile: () => router.push({ name: routeNames.profile.details }),
      createBooking: () => router.push({ name: routeNames.spaces.book }),
      filteredReservations,
      routeNames,
      formatDate,
      isMember,
    };
  },
});
</script>

<style lang="scss" scoped></style>
