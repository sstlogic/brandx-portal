<template>
  <v-sheet>
    <v-fade-transition group leave-absolute>
      <div v-if="!loading" :key="1">
        <div class="d-flex align-center">
          <div>
            <div class="font-weight-bold pa-2 resource-name">
              {{ resource.name }}
              <div class="error--text font-weight-medium" v-if="!available && !guest && isRepeating">
                This repeating booking can not be selected due to conflicts.
              </div>
              <div class="success--text font-weight-medium" v-if="available && !guest && isRepeating">
                Great news! All times are available - tap Select to continue.
              </div>
            </div>
          </div>
          <v-spacer />
          <v-fade-transition>
            <base-button v-if="isRepeating && available" :disabled="!available"
              @click="selectResource">Select</base-button>
          </v-fade-transition>
        </div>

        <div class="calendar row-wrapper" ref="calendar">
          <div class="header-row">
            <div class="row-day-wrapper">
              <v-sheet width="50px" color="transparent" class="row-day"> </v-sheet>
            </div>
            <div class="d-flex">
              <v-sheet v-for="i in Array(24).keys()" :key="i" width="160px" class="hour py-1"
                :ref="i == startHour ? 'currentHour' : ''">
                {{ formatHour(i) }}
              </v-sheet>
            </div>
          </div>
          <slot-calendar-row v-for="(group, index) in groupSlots(resource)" :key="index" :date="group.date"
            :slots="group.slots" :resource="resource" @input="emit('input', $event)" />
        </div>
      </div>
    </v-fade-transition>
  </v-sheet>
</template>

<script lang="ts">
import { Resource } from '@/models/booked/Resource';
import { computed, defineComponent, PropType, ref, watch } from '@/plugins/composition';
import SlotCalendarRow from './SlotCalendarRow.vue';
import Vue from 'vue';
import { useBookedSchedules } from '@/composables/useBookedResources';
import BaseButton from '../base/BaseButton.vue';
import { useCreatingBooking, hasConflicts, hasAvailableSlots } from '@/composables/useCreatingBooking';
import getHours from 'date-fns/fp/getHours/index.js';

export default defineComponent({
  components: { SlotCalendarRow, BaseButton },
  name: 'ResourceCalendar',
  props: {
    resource: {
      type: Object as PropType<Resource>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    guest: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const currentHour = ref<
      | (Vue &
          {
            $el: HTMLElement;
          }[])
      | null
    >(null);
    const calendar = ref<HTMLElement | null>(null);

    const available = computed(() => {
      return hasAvailableSlots(props.resource) && !hasConflicts(props.resource);
    });

    const resources = ref<Resource[]>([]);

    const scrollToCurrentHour = () => {
      const calendarOffset = calendar.value?.offsetLeft;
      const currentHourRef = currentHour.value && currentHour.value.length > 0 ? currentHour.value[0] : null;
      const currentHourOffset = currentHourRef ? currentHourRef.$el.offsetLeft : 0;

      if (calendarOffset && currentHourOffset && calendar.value) {
        calendar.value.scrollLeft = currentHourOffset - calendarOffset - 50;
      }
    };

    watch([calendar, currentHour], () => {
      scrollToCurrentHour();
    });

    const { groupSlots } = useBookedSchedules();

    const { repeatingType, isRepeating, currentResource, repeatingOptions } = useCreatingBooking();
    
    watch(
      () => repeatingOptions.value.startTime,
      () => {
        scrollToCurrentHour();
      }
    );
      console.log(props.resource, 'props.resource');
    const selectResource = () => {
      currentResource.value = props.resource;
    };

    const formatHour = (hour: number) => {
      if (hour === 12) {
        return '12pm';
      }
      if (hour === 0) {
        return '12am';
      }

      return hour > 12 ? hour - 12 + 'pm' : hour + 'am';
    };

    const startHour = computed(() => {
      return getHours(repeatingOptions.value.startTime);
    });

    return {
      resources,
      groupSlots,
      formatHour,
      calendar,
      currentHour,
      scroll: scrollToCurrentHour,
      emit,
      repeatingType,
      isRepeating,
      available,
      startHour,
      selectResource,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-row {
  display: flex;
  width: min-content;
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
  position: relative;

  &::before {
    content: '';
    position: absolute;
    border-left: 1px dashed rgba(0, 0, 0, 0.3);
    left: 0;
    top: 0px;
    height: 100vh;
  }
}

.calendar {
  border: 1px solid var(--v-darkGray-darken1) !important;
  overflow-y: hidden !important;
}

.resource-name {
  border-left: 4px solid black;
}
</style>
