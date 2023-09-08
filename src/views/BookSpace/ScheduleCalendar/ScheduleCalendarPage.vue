<template>
  <member-page title="Find a Booking" title-class="pb-0" :show-title="!selected" class="pb-12">
    <template #header>
      <schedule-calendar-page-header :schedule="schedule" />
    </template>

    <inline-legend class="mt-4" />

    <schedule-calendar v-if="schedule" :schedule="schedule" :start="currentBooking.repeating.startDate" />

    <v-overlay :value="true" v-if="showSettings" />

    <v-expand-transition>
      <schedule-calendar-confirmation-drawer />
    </v-expand-transition>
  </member-page>
</template>

<script lang="ts">
import ScheduleCalendar from '@/components/SlotCalendar/ScheduleCalendar.vue';
import MemberPage from '@/layouts/MemberLayout/MemberPage.vue';
import { Schedule } from '@/models/booked/Schedule';
import { defineComponent, onMounted, PropType, ref } from '@/plugins/composition';
import { routeNames } from '@/router/routeNames';
import { useRouter } from '@/router/useRouter';
import { useCreatingBooking, currentBooking } from '@/composables/useCreatingBooking';
import { useBookedSchedules } from '@/composables/useBookedResources';
import { formatDateTime, formatDate, formatTime } from '@/utils/date';
import ScheduleCalendarPageHeader from './components/ScheduleCalendarPageHeader.vue';
import ScheduleCalendarConfirmationDrawer from './components/ScheduleCalendarConfirmationDrawer.vue';
import InlineLegend from './components/InlineLegend.vue';

export default defineComponent({
  components: {
    ScheduleCalendar,
    MemberPage,
    ScheduleCalendarPageHeader,
    ScheduleCalendarConfirmationDrawer,
    InlineLegend,
  },
  name: 'BookingsCalendarPage',
  props: {
    scheduleId: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    const schedule = ref<Schedule | null>(null);

    const repeats = ref(false);

    const { selected, showSettings, clearSlots } = useCreatingBooking();
    const { getSchedule } = useBookedSchedules();

    const { router } = useRouter();

    const goToLogin = () => {
      router.push({ name: routeNames.auth.login });
    };

    onMounted(async () => {
      schedule.value = await getSchedule(props.scheduleId);
    });

    return {
      schedule,
      goToLogin,
      showSettings,
      repeats,
      formatDateTime,
      selected,
      formatDate,
      formatTime,

      clearSlots,
      currentBooking,
    };
  },
});
</script>

<style scoped lang="scss">
.col-third {
  width: 33%;
}
</style>
