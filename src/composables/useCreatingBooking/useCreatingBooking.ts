import { Resource } from '@/models/booked/Resource';
import { Schedule } from '@/models/booked/Schedule';
import { Slot } from '@/models/booked/Slot';
import { ref, computed, reactive, watch } from '@/plugins/composition';
import { moreThan, lessThan } from '@/utils/date';
import { addHours, addWeeks, getDate, getMonth, isBefore, setDate, setMonth, startOfDay } from 'date-fns';
import { format, toDate } from 'date-fns-tz';
import { RepeatingOptions } from '../useBookedResources/types';

/**
 * Reservation
 */
type ReservationState = {
  generatingIncome: boolean;
  funded: boolean;
  performance: boolean;
  attendees: number | null;
  description: string;
  repeating: {
    type: string;
    days: number[];
    startDate: Date | null;
    endDate: Date | null;
    interval: number;
    startTime: Date | null;
    endTime: Date | null;
  };
  startDateTime: Date | null;
  endDateTime: Date | null;
  resource: Resource | null;
  schedule: Schedule | null;
};

const defaultReservationState: ReservationState = {
  generatingIncome: false,
  funded: false,
  performance: false,
  attendees: null,
  description: '',
  repeating: {
    type: 'single',
    days: [],
    startDate: new Date(),
    endDate: addWeeks(new Date(), 1),
    interval: 1,
    startTime: addHours(startOfDay(new Date()), 8),
    endTime: addHours(startOfDay(new Date()), 10),
  },
  startDateTime: null,
  endDateTime: null,
  resource: null,
  schedule: null,
};

const repeatingOptions = computed<RepeatingOptions>(() => ({
  interval: currentBooking.repeating.interval,
  intervalType: currentBooking.repeating.type,
  startDate: currentBooking.repeating.startDate as Date,
  endDate: currentBooking.repeating.endDate as Date,
  days: currentBooking.repeating.days,
  startTime: currentBooking.repeating.startTime as Date,
  endTime: currentBooking.repeating.endTime as Date,
}));

const isRepeating = computed(() => currentBooking.repeating.type !== 'single');
const repeatingType = computed({
  get: () => currentBooking.repeating.type,
  set: (value: string) => {
    currentBooking.repeating.type = value;
  },
});
const selectedDays = computed({
  get: () => currentBooking.repeating.days,
  set: (value: number[]) => {
    currentBooking.repeating.days = value;
  },
});

const resetCurrentBooking = () => {
  Object.assign(currentBooking, defaultReservationState);
};

export const currentBooking = reactive<ReservationState>({ ...defaultReservationState });

/**
 * Resource and Schedule
 */
const currentResource = ref<Resource | null>(null);
const currentSchedule = ref<Schedule | null>(null);

/**
 * Calendar
 */
type CalendarStart = {
  startSlot: Slot | null;
  endSlot: Slot | null;
};

const defaultCalendarState = {
  startSlot: null,
  endSlot: null,
};

const clearSlots = () => {
  calendarSelection.startSlot = null;
  calendarSelection.endSlot = null;
  currentResource.value = null;
};

const resetCalendar = () => {
  clearSlots();
};

const showConfirmation = computed(() => {
  return isRepeating.value ? !!currentResource.value : selected.value.length > 0;
});

const selected = computed<Slot[]>(() => {
  return [calendarSelection.startSlot, calendarSelection.endSlot].filter((slot: Slot | null) => !!slot) as Slot[];
});

export const calendarSelection = reactive<CalendarStart>({ ...defaultCalendarState });

/**
 * Miscellaneous
 */
const showSettings = ref(false);

const setDayAndMonthToMatch = (toSet: Date, time: Date) => {
  const day = getDate(time);
  const month = getMonth(time);

  return setDate(setMonth(toSet, month), day);
};

const formatForCompare = (date: Date) => {
  const string = format(date, 'yyyy-MM-dd') + 'T' + format(date, 'HH:mm:ss');

  return toDate(string, { timeZone: 'Australia/Sydney' });
};

export const slotIsWithinSearch = (slot: Slot) => {
  const slotStart = new Date(slot.startDateTime);
  const slotEnd = new Date(slot.endDateTime);

  const startTime = setDayAndMonthToMatch(currentBooking.repeating.startTime as Date, slotStart);
  const endTime = setDayAndMonthToMatch(currentBooking.repeating.endTime as Date, slotEnd);

  if (moreThan(slotEnd, formatForCompare(startTime), false) && lessThan(slotEnd, formatForCompare(endTime), false)) {
    return true;
  }

  if (
    moreThan(slotStart, formatForCompare(startTime), false) &&
    lessThan(slotStart, formatForCompare(endTime), false)
  ) {
    return true;
  }

  if (moreThan(formatForCompare(startTime), slotStart, false) && lessThan(formatForCompare(endTime), slotEnd, false)) {
    return true;
  }

  return (
    moreThan(slotStart, formatForCompare(startTime)) &&
    lessThan(slotEnd, formatForCompare(endTime)) &&
    moreThan(slotEnd, formatForCompare(startTime), false)
  );
};

export const slotIsAvailable = (slot: Slot) => {
  const slotStart = new Date(slot.startDateTime);
  const slotEnd = new Date(slot.endDateTime);

  const startTime = setDayAndMonthToMatch(currentBooking.repeating.startTime as Date, slotStart);
  const endTime = setDayAndMonthToMatch(currentBooking.repeating.endTime as Date, slotEnd);

  return (
    slot.isReservable &&
    moreThan(slotStart, formatForCompare(startTime)) &&
    lessThan(slotEnd, formatForCompare(endTime)) &&
    moreThan(slotEnd, formatForCompare(startTime), false)
  );
};

export const hasConflicts = (resource: Resource) => {
  return resource.slots.some((slot: Slot) => {
    if (slotIsWithinSearch(slot)) {
      return !slotIsAvailable(slot);
    }

    return false;
  });
};

export const hasAvailableSlots = (resource: Resource) => {
  return resource.slots.some((slot: Slot) => {
    return slotIsAvailable(slot);
  });
};

watch(
  () => repeatingOptions.value.startDate,
  () => {
    if (isBefore(repeatingOptions.value.endDate, repeatingOptions.value.startDate)) {
      currentBooking.repeating.endDate = currentBooking.repeating.startDate;
    }
  }
);

export const useCreatingBooking = () => {
  return {
    currentResource,
    performance,
    selected,
    clearSlots,
    showSettings,
    selectedDays,
    isRepeating,
    currentSchedule,
    repeatingType,
    resetCurrentBooking,
    resetCalendar,
    repeatingOptions,
    slotIsAvailable,
    hasAvailableSlots,
    hasConflicts,
    showConfirmation,
  };
};
