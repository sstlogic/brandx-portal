<template>
  <v-sheet class="pt-4">
    <div v-if="isRepeating">
      <div v-if="availableResources.length > 0">
        <div class="mb-4">
          <div class="text-h5 font-weight-bold">Available Options</div>
          <div>To continue with your booking please select a space where all times requested are available.</div>
        </div>
        <div v-for="resource in availableResources" :key="resource.id">
          <resource-calendar
            class="mb-8"
            :resource="resource"
            :loading="loading"
            @input="selectSlot($event, resource)"
            :guest="guest"
          />
        </div>

        <v-divider class="mb-8 mt-4" />
      </div>

      <div v-if="unavailableResources.length > 0">
        <div class="mb-4">
          <div class="text-h5 font-weight-bold" v-if="availableResources.length > 0">Unavailable Options</div>
          <div v-else>
            <div class="text-h5 font-weight-bold">Review calendars and try again</div>
            <div>Unfortunately your preferences are not available.</div>
          </div>
        </div>

        <div v-for="resource in unavailableResources" :key="resource.id">
          <resource-calendar
            class="mb-8"
            :resource="resource"
            :loading="loading"
            @input="selectSlot($event, resource)"
            :guest="guest"
          />
        </div>
      </div>
    </div>

    <div v-else>
      <div v-for="resource in resources" :key="resource.id">
        <resource-calendar
          class="mb-8"
          :resource="resource"
          :loading="loading"
          @input="selectSlot($event, resource)"
          :guest="guest"
        />
      </div>
    </div>

    <div v-if="resources.length === 0 && !loading">
      <div class="text-center font-weight-light grey--text">
        Calendars for this space are not open at this time. Please
        <router-link :to="{ name: routeNames.spaces.book }">select an alternative space</router-link> or check back
        later.
      </div>
    </div>
    <div v-if="loading">
      <v-skeleton-loader type="table-heading" />
      <v-skeleton-loader v-for="i in 7" :key="i" class="d-flex justify-space-between" type="table-cell@4" />
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { useBookedSchedules } from '@/composables/useBookedResources/useBookedSchedules';
import { useLoader } from '@/composables/useLoader';
import { Resource } from '@/models/booked/Resource';
import { Schedule } from '@/models/booked/Schedule';
import { Slot } from '@/models/booked/Slot';
import { computed, defineComponent, onMounted, PropType, ref, watch } from '@/plugins/composition';
import { endOfWeek } from 'date-fns';
import ResourceCalendar from './ResourceCalendar.vue';
import SlotCalendarRow from './SlotCalendarRow.vue';
import { isSameDay } from 'date-fns';
import {
  useCreatingBooking,
  calendarSelection,
  hasAvailableSlots,
  hasConflicts,
} from '@/composables/useCreatingBooking';
import { routeNames } from '@/router/routeNames';
import { useSettingsDrawer } from '@/composables/useCreatingBooking/useSettingsDrawer';
import { useStatus } from '@/composables/useStatus';
import { useAuthStore } from '@/composables/useAuthStore';

export default defineComponent({
  components: { SlotCalendarRow, ResourceCalendar },
  name: 'ScheduleCalendar',
  props: {
    schedule: {
      type: Object as PropType<Schedule | null>,
      required: false,
      default: null,
    },
    start: {
      type: Date,
      default: () => new Date(),
    },
    guest: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { getScheduleSlots, getScheduleRepeatingSlots } = useBookedSchedules();
    const { setMessage } = useStatus();
    const { isMember } = useAuthStore();

    const resources = ref<Resource[]>([]);

    const availableResources = computed(() => {
      return resources.value.filter((resource) => {
        return hasAvailableSlots(resource) && !hasConflicts(resource);
      });
    });

    const unavailableResources = computed(() => {
      return resources.value.filter((resource) => {
        return hasConflicts(resource);
      });
    });

    const { currentResource, currentSchedule, isRepeating, repeatingOptions, showSettings } = useCreatingBooking();
    const { refreshRequired } = useSettingsDrawer();
    const { loading, withLoader } = useLoader();

    const load = async () =>
      withLoader(async () => {
        if (props.schedule) {
          const schedule = isRepeating.value
            ? await getScheduleRepeatingSlots(props.schedule.id, repeatingOptions.value)
            : await getScheduleSlots(props.schedule.id, {
                start: props.start,
                end: endOfWeek(props.start, { weekStartsOn: 1 }),
              });

          resources.value = schedule.resources;
        }
      });

    const selectSlot = async (slot: Slot, selectedResource: Resource) => {
      if (props.guest) {
        if (!isMember.value) {
          setMessage('This calendar is view only. Get an Artist Pass to make a booking.');
        } else {
          setMessage('This calendar is view only. Login to make a booking.');
        }

        return;
      }

      currentResource.value = selectedResource;

      if (calendarSelection.startSlot) {
        const start = new Date(calendarSelection.startSlot.startDateTime);
        const selected = new Date(slot.startDateTime);

        if (!isSameDay(start, selected)) {
          calendarSelection.startSlot = slot;
          calendarSelection.endSlot = slot;
          return;
        }
      }

      if (calendarSelection.startSlot) {
        const start = new Date(calendarSelection.startSlot.startDateTime);
        const selected = new Date(slot.startDateTime);

        if (selected.getTime() < start.getTime()) {
          calendarSelection.startSlot = slot;
          calendarSelection.endSlot = slot;
          return;
        }
      }

      if (calendarSelection.startSlot && calendarSelection.endSlot) {
        const start = new Date(calendarSelection.startSlot.startDateTime);
        const end = new Date(calendarSelection.endSlot.endDateTime);

        const selected = new Date(slot.startDateTime);

        if (selected.getTime() >= start.getTime() && selected.getTime() < end.getTime()) {
          calendarSelection.startSlot = slot;
          calendarSelection.endSlot = slot;
          return;
        }
      }

      if (calendarSelection.startSlot) {
        calendarSelection.endSlot = slot;
        return;
      } else {
        calendarSelection.startSlot = slot;
        calendarSelection.endSlot = slot;
        return;
      }
    };

    onMounted(async () => {
      await load();
      currentSchedule.value = props.schedule;
    });

    watch(
      () => props.schedule,
      async () => await load()
    );

    watch(
      () => props.start,
      async () => {
        if (!isRepeating.value) {
          await load();
        }
      }
    );

    watch(refreshRequired, async (val: boolean) => {
      if (refreshRequired.value) {
        await load();
        refreshRequired.value = false;
      }
    });

    return {
      resources,
      loading,
      emit,
      selectSlot,
      routeNames,
      availableResources,
      unavailableResources,
      isRepeating,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-row {
  width: min-content;
  display: flex;
}
.row-day {
  &-wrapper {
    position: sticky;
    left: 0px;
    background: white;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    border-right: 1px solid var(--v-darkGray-darken1) !important;
  }
}
.hour {
  text-align: center;
}
.calendar {
  border: 1px solid var(--v-darkGray-darken1) !important;
}
</style>
