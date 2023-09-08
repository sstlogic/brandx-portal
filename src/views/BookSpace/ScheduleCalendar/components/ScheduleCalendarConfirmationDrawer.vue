<template>
  <div>
    <v-bottom-sheet
      :value="true"
      v-if="showConfirmation"
      class="settings-detail"
      eager
      persistent
      hide-overlay
      no-click-animation
    >
      <v-sheet color="black" class="pa-4">
        <div class="d-flex justify-space-between summary align-center">
          <div>
            <base-button @click="clearSlots" yellow> <v-icon color="white">mdi-close</v-icon></base-button>
          </div>
          <div>
            <div v-if="!isRepeating" class="white--text text-center font-weight-bold px-2">
              {{ formatDate(calendarSelection.startSlot.startDateTime, 'EEE dd/MM') }} <br />
              {{ formatDate(calendarSelection.startSlot.startDateTime, 'hh:mmaaa') }} -
              {{ formatDate(calendarSelection.endSlot.endDateTime, 'hh:mmaaa') }}
            </div>
            <div v-else class="white--text text-center font-weight-bold px-2">
              {{ currentResource.name }}
            </div>
          </div>
          <div>
            <base-button yellow @click="addBooking">Continue</base-button>
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import { useCreatingBooking, calendarSelection } from '@/composables/useCreatingBooking';
import { defineComponent } from '@/plugins/composition';
import { routeNames } from '@/router/routeNames';
import { useRouter } from '@/router/useRouter';
import { formatDate } from '@/utils/date';

export default defineComponent({
  components: { BaseButton },
  name: 'ScheduleCalendarConfirmationDrawer',
  setup() {
    const { selected, clearSlots, isRepeating, showConfirmation, currentResource } = useCreatingBooking();
    const { router } = useRouter();

    const addBooking = () => {
      router.push({ name: routeNames.bookings.confirm });
    };

    return {
      selected,
      clearSlots,
      isRepeating,
      formatDate,
      calendarSelection,
      addBooking,
      showConfirmation,
      currentResource,
    };
  },
});
</script>

<style scoped lang="scss">
.settings-detail {
  position: absolute;
  bottom: 0px;
  width: 100%;
  left: 0px;
}
.summary {
  div {
    // width: 33%;
  }
}
</style>
