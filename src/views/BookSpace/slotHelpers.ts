import { Slot } from '@/models/booked/Slot';
import { isBefore } from 'date-fns';

export const isSlotSame = (slot: Slot, toCompare: Slot): boolean => {
  return slot.uuid === toCompare.uuid;
};

export const isSlotBeforeSlot = (slot: Slot, toCompare: Slot): boolean => {
  if (isSlotSame(slot, toCompare)) {
    return false;
  }

  const slotDate = new Date(slot.startDateTime);
  const compareDate = new Date(toCompare.startDateTime);

  return isBefore(slotDate, compareDate);
};
