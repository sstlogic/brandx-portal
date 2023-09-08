import { Reservation } from '@/models/booked/Reservation';
import { formatISO } from 'date-fns';
import { useApi } from '../useApi';
import { ResourceResponse } from '../useApi/types';
import { useAuthStore } from '../useAuthStore';
import { CreateBookingData, PendingReservation } from './types';

export const createReservation = async (
  booking: CreateBookingData,
  user: string,
  resource: number,
  resourceName: string
) => {
  const { post } = useApi();

  await post('/reservations', {
    start: booking.start,
    end: booking.end,
    user: user,
    resource: resource,
    attendees: booking.attendees,
    generatingIncome: booking.income,
    funded: booking.funding,
    performance: booking.performance,
    description: booking.description,
    resource_name: resourceName,
  }).catch((error) => Promise.reject(error));

  return true;
};

export const createRepeatingReservation = async (
  booking: CreateBookingData,
  user: string,
  resource: number,
  resourceName: string
) => {
  const { post } = useApi();

  await post('/reservations', {
    start: formatISO(booking.start),
    end: formatISO(booking.end),
    user: user,
    resource: resource,
    attendees: booking.attendees,
    generatingIncome: booking.income,
    funded: booking.funding,
    performance: booking.performance,
    description: booking.description,
    start_time: booking.start_time,
    end_time: booking.end_time,
    interval_type: booking.interval_type,
    interval: booking.interval,
    weekly_days: booking.weekly_days,
    resource_name: resourceName,
  }).catch((error) => Promise.reject(error));

  return true;
};

export const getPendingReservations = async () => {
  const { get } = useApi();
  const { user } = useAuthStore();

  const response = await get<ResourceResponse<PendingReservation[]>>(`/users/${user.value.uuid}/pending-reservations`);

  return response.data;
};

export const getBookedReservations = async (): Promise<Reservation[]> => {
  const { get } = useApi();

  const response = await get<ResourceResponse<Reservation[]>>('/booked/reservations');

  return response.data;
};
