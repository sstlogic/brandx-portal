<template>
  <v-sheet class="row-wrapper">
    <div class="row-day-wrapper">
      <v-sheet width="50px" color="transparent" class="row-day">
        <div class="text-center pa-1">
          <div>
            <strong>{{ formatDate(date, 'EEE') }}</strong>
          </div>
          <div>
            <strong>{{ formatDate(date, 'dd/MM') }}</strong>
          </div>
        </div>
      </v-sheet>
    </div>
    <div class="d-flex align-center">
      <v-sheet
        :width="getWidth(slot)"
        v-for="(slot, index) in slots"
        :key="index"
        class="slot text-center"
        :class="{
          reservable: slot.isReservable,
          'cursor-pointer': slot.isReservable,
        }"
        :color="getColour(slot)"
        height="30px"
        @click="selectSlot(slot)"
      >
        <div v-if="isAuthed && isMember">
          {{ showIcon(slot) ? '+' : '' }}
        </div>
      </v-sheet>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { useAuthStore } from '@/composables/useAuthStore';
import { useCreatingBooking, calendarSelection, slotIsWithinSearch } from '@/composables/useCreatingBooking';
import { Resource } from '@/models/booked/Resource';
import { Slot } from '@/models/booked/Slot';
import { defineComponent, PropType, ref, watch } from '@/plugins/composition';
import { formatDate } from '@/utils/date';

export default defineComponent({
  name: 'SlotCalendarRow',
  props: {
    date: {
      type: Date,
      required: true,
    },
    slots: {
      type: Array as PropType<Slot[]>,
      default: () => [],
    },
    resource: {
      type: Object as PropType<Resource>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { selected, repeatingType, isRepeating } = useCreatingBooking();
    const { isAuthed, isMember } = useAuthStore();

    const include = ref<Slot[]>([]);
    const getWidth = (slot: Slot) => {
      const blocks = slot.duration / 15;
      return slot.duration * 2 + (blocks - 1) * 10;
    };

    const getColour = (slot: Slot) => {
      if (repeatingType) {
        if (slot.isReserved === false && slot.isReservable === false) {
          return 'black';
        }

        if (!isRepeating.value && include.value.some((item: Slot) => item.uuid === slot.uuid)) {
          return 'yellow';
        }

        if (slotIsWithinSearch(slot) && isRepeating.value) {
          return slot.isReservable ? 'yellow' : 'error';
        }
      }

      return slot.isReservable ? 'lightYellow' : 'darkGray';
    };

    const selectSlot = (slot: Slot) => {
      if (slot.isReservable && !isRepeating.value) {
        emit('input', slot);
      }
    };

    const showIcon = (slot: Slot) => {
      if (isRepeating.value) {
        return false;
      }

      if (include.value.some((item: Slot) => item.uuid === slot.uuid)) {
        return false;
      }

      if (!slot.isReservable) {
        return false;
      }

      return true;
    };

    watch(selected, () => {
      include.value = props.slots.filter((slot: Slot) => {
        const start = calendarSelection.startSlot;
        const end = calendarSelection.endSlot;

        if (!start || !end) {
          return false;
        }

        const startDate = new Date(start.startDateTime);
        const endDate = new Date(end.endDateTime);

        const slotStart = new Date(slot.startDateTime);
        const slotEnd = new Date(slot.endDateTime);

        if (start.resource.id != props.resource.id) {
          return false;
        }

        if (end.resource.id != props.resource.id) {
          return false;
        }

        if (!slot.isReservable) {
          return false;
        }

        if (startDate.getTime() == slotStart.getTime() || endDate.getTime() == slotEnd.getTime()) {
          return true;
        }

        if (slotStart.getTime() > startDate.getTime() && slotEnd.getTime() < endDate.getTime()) {
          return true;
        }

        return false;
      });
    });

    return {
      formatDate,
      getWidth,
      getColour,
      selectSlot,
      showIcon,
      isRepeating,
      repeatingType,
      isAuthed,
      isMember,
    };
  },
});
</script>

<style lang="scss" scoped>
.row-wrapper {
  border-top: 1px solid var(--v-darkGray-darken1) !important;
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
.slot {
  border-radius: 15px;
  margin: 0.5rem 5px;
  padding: 0.125rem 0px;
  white-space: nowrap;
  &.reservable {
    border: 1px solid;
    border-color: var(--v-lightYellow-darken1) !important;
  }
}
</style>
