<template>
  <member-page title="Bookings Calendar">
    <div class="mb-4">
      <div>
        <p>
          Welcome to the Brand X Booking Calendar. This calendar displays all confirmed bookings and available space
          across all of our studios for hire.
        </p>
        <p class="font-weight-bold">
          Below is a "view only" calendar where you can only check availability. To book a space with Brand X, you will
          need

          <router-link v-if="!isAuthed" to="/register">Artist Pass</router-link>
          <router-link v-if="isAuthed" to="/subscriber">Artist Pass</router-link>
          subscription.
        </p>
      </div>
    </div>

    <div class="d-flex mb-4 align-center justify-center" v-if="!isAuthed">
      <div class="mr-4">Already an Artist Pass subscriber?</div>
      <base-button black @click="goToLogin">Login</base-button>
    </div>

    <div class="mb-4">
      <p>
        Please refer to the Artist Pass
        <a href="https://www.brandx.org.au/artist-pass-terms-and-conditions" @click.stop target="_blank">terms and
          conditions</a>
      </p>
    </div>

    <v-divider class="my-4" />

    <div class="mb-6">
      <inline-legend guest />
    </div>

    <schedule-select-input v-model="schedule" />
    <date-picker v-model="startDate" label="Show dates from" weekly />

    <schedule-calendar :schedule="schedule" :start="startDate" guest />
  </member-page>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import DatePicker from '@/components/inputs/DatePicker.vue';
import ScheduleSelectInput from '@/components/inputs/ScheduleSelect/ScheduleSelectInput.vue';
import ScheduleCalendar from '@/components/SlotCalendar/ScheduleCalendar.vue';
import { useAuthStore } from '@/composables/useAuthStore';
import MemberPage from '@/layouts/MemberLayout/MemberPage.vue';
import { Schedule } from '@/models/booked/Schedule';
import { defineComponent, ref } from '@/plugins/composition';
import { routeNames } from '@/router/routeNames';
import { useRouter } from '@/router/useRouter';
import InlineLegend from '../BookSpace/ScheduleCalendar/components/InlineLegend.vue';
import HomePageText from './components/HomePageText.vue';

export default defineComponent({
  components: { ScheduleSelectInput, HomePageText, BaseButton, DatePicker, ScheduleCalendar, MemberPage, InlineLegend },
  name: 'HomePage',
  setup() {
    const startDate = ref(new Date());
    const schedule = ref<Schedule | null>(null);
    const { isAuthed } = useAuthStore();

    const { router } = useRouter();

    const goToLogin = () => {
      router.push({ name: routeNames.auth.login });
    };

    return {
      startDate,
      schedule,
      goToLogin,
      isAuthed,
    };
  },
});
</script>

<style scoped lang="scss">
.col-third {
  width: 33%;
}
</style>
