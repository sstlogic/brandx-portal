<template>
  <div
    :class="{
      'pt-4': !isRepeating,
      'pt-2': isRepeating,
    }"
  >
    <date-picker
      v-if="!isRepeating || showSettings"
      v-model="currentBooking.repeating.startDate"
      :label="isRepeating ? 'Start Date' : 'Search Dates from Week Commencing'"
      :weekly="isRepeating ? false : true"
      class="mb-4"
      :min="minStart"
    />

    <div v-if="isRepeating && !showSettings">
      <div class="font-weight-bold">Repeating</div>
      <div>
        <span class="text-capitalize">{{ repeatingType.includes('monthly') ? 'Monthly' : repeatingType }}</span
        >, from {{ formatDate(currentBooking.repeating.startDate) }}
      </div>
      <div>
        Time: {{ formatTime(currentBooking.repeating.startTime, 'hh:mmaaa') }} to
        {{ formatTime(currentBooking.repeating.endTime, 'hh:mmaaa') }}
      </div>
    </div>

    <v-expand-transition>
      <v-sheet color="lightGray darken-1" v-show="showSettings" class="settings-detail px-4 pb-8">
        <recurring-input v-model="repeatingType" class="mb-4" />

        <v-expand-transition>
          <div v-if="isRepeating">
            <div class="d-flex times mb-4">
              <v-select
                v-model="currentBooking.repeating.startTime"
                class="mr-1"
                label="Start Time"
                dense
                outlined
                hide-details
                :items="times"
                :item-text="timeText"
                return-object
                :item-disabled="isStartTimeDisabled"
              />
              <v-select
                v-model="currentBooking.repeating.endTime"
                class="ml-2"
                label="End Time"
                dense
                outlined
                hide-details
                :items="times"
                :item-text="timeText"
                return-object
                :item-disabled="isEndTimeDisabled"
                :disabled="!currentBooking.repeating.startTime"
              />
            </div>

            <div>
              <v-text-field
                label="interval"
                :suffix="getIntervalSuffix"
                prefix="Every"
                dense
                outlined
                hide-details
                class="mb-4"
                v-model="currentBooking.repeating.interval"
                type="number"
              />
            </div>

            <v-expand-transition>
              <div class="d-flex justify-center mb-4" v-if="repeatingType == 'weekly'">
                <v-btn-toggle multiple v-model="selectedDays">
                  <v-btn v-for="day in days" :key="day" color="darkGray">
                    {{ day[0] }}
                  </v-btn>
                </v-btn-toggle>
              </div>
            </v-expand-transition>

            <div>
              <date-picker v-model="currentBooking.repeating.endDate" label="Repeating Until" :min="minEnd" />
            </div>
          </div>
        </v-expand-transition>

        <v-fab-transition>
          <v-btn
            class="mr-12"
            color="black"
            :dark="!valid ? false : true"
            absolute
            bottom
            right
            x-small
            fab
            @click.stop="showSettings = false"
          >
            <v-icon color="yellow">mdi-close</v-icon>
          </v-btn>
        </v-fab-transition>

        <v-fab-transition>
          <v-btn
            color="yellow"
            :dark="!valid ? false : true"
            absolute
            bottom
            right
            small
            fab
            @click="confirm"
            :disabled="!valid"
            class="close-button"
          >
            <v-icon color="black">mdi-check</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-sheet>
    </v-expand-transition>
    <div class="caption text-right mr-12" v-if="!isRepeating">
      To make single bookings, select from the calendars below. To make recurring bookings click this icon.
    </div>
    <div class="caption text-right mr-12" v-if="isRepeating">To modify this search, click on this icon</div>
  </div>
</template>

<script lang="ts">
import DatePicker from '@/components/inputs/DatePicker.vue';
import { useCreatingBooking, currentBooking } from '@/composables/useCreatingBooking';
import { computed, defineComponent } from '@/plugins/composition';
import { formatDate } from '@/utils/date';
import { format } from 'date-fns';
import RecurringInput from '../../components/RecurringInput.vue';
import { useSettingsDrawer } from '@/composables/useCreatingBooking/useSettingsDrawer';
import startOfWeek from 'date-fns/startOfWeek/index';

export default defineComponent({
  name: 'SettingsDrawer',
  components: {
    RecurringInput,
    DatePicker,
  },
  setup() {
    const { showSettings, repeatingType, selectedDays, isRepeating } = useCreatingBooking();
    const { refreshRequired } = useSettingsDrawer();

    const confirm = () => {
      showSettings.value = false;
      refreshRequired.value = true;
    };

    const minStart = computed(() => {
      if (!isRepeating.value) {
        return startOfWeek(new Date(), { weekStartsOn: 1 });
      }

      return new Date();
    });

    const minEnd = computed(() => {
      return minStart.value;
    });

    return {
      isRepeating,
      ...useSettingsDrawer(),
      selectedDays,
      showSettings,
      formatDate,
      formatTime: format,
      repeatingType,
      currentBooking,
      confirm,
      minStart,
      minEnd,
    };
  },
});
</script>

<style scoped lang="scss">
.times {
  div {
    width: 50%;
  }
}
.settings-detail {
  position: absolute;
  box-shadow: 0 4px 3px -3px grey;
  width: 100%;
  left: 0px;
}
::v-deep .close-button.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
  background-color: var(--v-darkGray-darken1) !important;
}
</style>
