import { Schedule } from '@/models/booked/Schedule';
import { startAndEndOfWeek } from '@/utils/date';
import { formatISO } from 'date-fns';
import { useApi } from '../useApi';
import { ResourceResponse } from '../useApi/types';
import { formatDate } from '@/utils/date';
import { Slot } from '@/models/booked/Slot';
import { Resource } from '@/models/booked/Resource';
import { DateRange, GroupedSlots, RepeatingOptions } from './types';

export const useBookedSchedules = () => {
  const { get } = useApi();

  const getSchedules = async () => {
    const response = await get<ResourceResponse<Schedule[]>>('/schedules');

    return response.data;
  };

  const getSchedule = async (id: string | number) => {
    const response = await get<ResourceResponse<Schedule>>('/schedules/' + id);

    return response.data;
  };

  const getResourceSlots = async (resource: Resource, range: DateRange) => {
    const { start, end } = range;

    const response = await get<ResourceResponse<Slot[]>>(
      `/resources/${resource.id}/slots?start_time=${encodeURIComponent(formatISO(start))}&end_time=${encodeURIComponent(
        formatISO(end)
      )}`
    );

    return response.data;
  };

  const getScheduleSlots = async (scheduleId: number, range?: DateRange) => {
    const { start, end } = startAndEndOfWeek(range?.start ?? new Date());

    const response = await get<ResourceResponse<Schedule>>(
      `/schedules/${scheduleId}/slots?start_time=${encodeURIComponent(formatISO(start))}&end_time=${encodeURIComponent(
        formatISO(end)
      )}`
    );

    return response.data;
  };

  const getScheduleRepeatingSlots = async (scheduleId: number, options: RepeatingOptions) => {
    let query = `/schedules/${scheduleId}/slots/repeating?start_date=${encodeURIComponent(
      formatISO(options.startDate)
    )}&end_date=${encodeURIComponent(formatISO(options.endDate))}&interval_type=${options.intervalType}&interval=${
      options.interval
    }`;

    if (options.intervalType === 'weekly') {
      query = query.concat(`&weekly_days=${options.days.join(',')}`);
    }

    const response = await get<ResourceResponse<Schedule>>(query);

    return response.data;
  };

  const groupSlots = (resource: Resource) => {
    return resource.slots.reduce((groups: GroupedSlots, slot: Slot) => {
      const date = new Date(slot.date);
      const dateString = formatDate(date) as string;

      if (!groups[dateString]) {
        groups[dateString] = {
          date: date,
          slots: [],
        };
      }

      groups[dateString].slots.push(slot);

      return groups;
    }, {} as GroupedSlots);
  };

  return {
    getSchedules,
    getScheduleSlots,
    groupSlots,
    getResourceSlots,
    getSchedule,
    getScheduleRepeatingSlots,
  };
};
