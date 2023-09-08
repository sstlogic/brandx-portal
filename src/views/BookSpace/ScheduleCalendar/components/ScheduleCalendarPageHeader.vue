<template>
  <div>
    <v-sheet class="settings-wrapper">
      <v-sheet class="settings">
        <v-sheet color="black" class="pa-4 d-flex flex-column" elevation="0">
          <div>
            <router-link
              :to="{ name: routeNames.spaces.book }"
              class="white--text font-weight-bold"
              style="text-decoration: none"
            >
              &lt; view a different calendar
            </router-link>
          </div>
          <div class="d-flex align-center">
            <div class="font-weight-black yellow--text text-h5">{{ schedule ? schedule.name : '' }} Calendar</div>

            <!-- TODO - Tooltip/Click to open info dialog -->
            <legend-dialog>
              <v-icon color="lightGray" class="ml-2">mdi-information</v-icon>
            </legend-dialog>
          </div>
        </v-sheet>

        <v-sheet :max-width="md ? '1080px' : '100%'" class="mx-auto" style="position: relative">
          <v-expand-transition>
            <v-sheet color="lightGray darken-1" class="settings-detail py-2 px-4" width="100% ">
              <settings-drawer />
            </v-sheet>
          </v-expand-transition>

          <v-fab-transition>
            <v-btn
              color="yellow"
              dark
              absolute
              bottom
              right
              small
              fab
              @click.stop="showSettings = true"
              v-if="!showSettings"
            >
              <v-icon color="black">mdi-tune</v-icon>
            </v-btn>
          </v-fab-transition>
        </v-sheet>
      </v-sheet>
    </v-sheet>
  </div>
</template>

<script lang="ts">
import DatePicker from '@/components/inputs/DatePicker.vue';
import { useCreatingBooking } from '@/composables/useCreatingBooking';
import { Schedule } from '@/models/booked/Schedule';
import { defineComponent, PropType } from '@/plugins/composition';
import { formatDate, formatTime } from '@/utils/date';
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';
import LegendDialog from './LegendDialog.vue';
import SettingsDrawer from './SettingsDrawer.vue';
import { routeNames } from '@/router/routeNames';

export default defineComponent({
  components: { DatePicker, SettingsDrawer, LegendDialog },
  name: 'ScheduleCalendarPageHeader',
  props: {
    schedule: {
      type: Object as PropType<Schedule>,
    },
  },
  setup() {
    const { selected, showSettings } = useCreatingBooking();
    const { md } = useBreakpoints(breakpointsTailwind);
    return {
      formatTime,
      formatDate,
      selected,
      showSettings,
      md,
      routeNames,
    };
  },
});
</script>

<style scoped lang="scss">
.settings {
  position: relative;
}
.settings-wrapper {
  position: sticky;
  z-index: 6;
  top: 75px;
  width: 100%;
}
</style>
