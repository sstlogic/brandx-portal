import { Slot } from '@/models/booked/Slot';

export type PriceResult = {
  rate: number;
  price: number;
  duration: number;
  discount: boolean;
  discountType: string | null;
  useType: string;
  rateType: string;
};

export type CreateBookingData = {
  start: Date;
  end: Date;
  description: string;
  attendees: number;
  income: boolean;
  funding: boolean;
  performance: boolean;
  start_time?: string;
  end_time?: string;
  interval_type?: string;
  interval?: number;
  weekly_days?: number[];
};

export type PendingReservation = {
  uuid: string;
  start: Date;
  end: Date;
  description: string;
  attendees: number;
  income: boolean;
  funding: boolean;
  performance: boolean;
  rate: number;
  price: number;
  duration: number;
  useType: string;
  dates: { start: string; end: string }[];
  resourceName: string;
};

export type DateRange = {
  start: Date;
  end: Date;
};

export type GroupedSlots = {
  [key: string]: {
    date: Date;
    slots: Slot[];
  };
};

export type RepeatingOptions = {
  interval: number;
  intervalType: string;
  startDate: Date;
  endDate: Date;
  days: number[];
  startTime: Date;
  endTime: Date;
};

export type SubscribedResponse = { reference: string; memberExpiry: string; nextBill: string };
