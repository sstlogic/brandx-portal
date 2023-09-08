import { computed, ref, watch } from '@vue/composition-api';
import { addMinutes, startOfDay, format, isAfter, isBefore, getDay } from 'date-fns';
import { useCreatingBooking, currentBooking } from './useCreatingBooking';

const { repeatingType, selectedDays, resetCalendar } = useCreatingBooking();
const refreshRequired = ref(false);

export const useSettingsDrawer = () => {
  const valid = computed(() => {
    if (!currentBooking.repeating.startTime || !currentBooking.repeating.endTime) {
      return false;
    }

    if (!currentBooking.repeating.interval || currentBooking.repeating.interval < 1) {
      return false;
    }

    if (currentBooking.repeating.type === 'weekly' && currentBooking.repeating.days.length === 0) {
      return false;
    }

    return true;
  });

  const until = ref<Date>(new Date());

  const timeText = (time: Date) => {
    return format(time, 'hh:mmaaa');
  };

  const times = computed(() => {
    const start = startOfDay(new Date());
    return Array.from(Array(24 * 2).keys()).map((index: number) => {
      return addMinutes(start, index * 30);
    });
  });

  const isStartTimeDisabled = (time: Date) => {
    if (!currentBooking.repeating.endTime) {
      return false;
    }
    if (isAfter(time, currentBooking.repeating.endTime as Date)) {
      return true;
    }
    if (time === currentBooking.repeating.endTime) {
      return true;
    }

    return false;
  };

  const isEndTimeDisabled = (time: Date) => {
    if (!currentBooking.repeating.startTime) {
      return false;
    }
    if (isBefore(time, currentBooking.repeating.startTime as Date)) {
      return true;
    }
    if (time === currentBooking.repeating.startTime) {
      return true;
    }
    return false;
  };

  const getIntervalSuffix = computed(() => {
    let suffix = '';
    if (repeatingType.value === 'weekly') {
      suffix = 'week';
    }

    if (repeatingType.value === 'daily') {
      suffix = 'day';
    }

    if (repeatingType.value === 'monthly-date' || repeatingType.value === 'monthly-day') {
      suffix = 'month';
    }

    if (currentBooking.repeating.interval > 1) {
      suffix += 's';
    }
    return suffix;
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  watch(
    repeatingType,
    (value: string) => {
      if (value === 'weekly') {
        const day = getDay(currentBooking.repeating.startDate as Date);
        selectedDays.value = [day];
      }
      resetCalendar();
    },
    { immediate: true }
  );

  return {
    valid,
    until,
    times,
    isStartTimeDisabled,
    isEndTimeDisabled,
    getIntervalSuffix,
    days,
    timeText,
    refreshRequired,
  };
};
