import {
  endOfWeek,
  getHours,
  getMinutes,
  parse,
  parseISO,
  setHours,
  setMinutes,
  setSeconds,
  startOfWeek,
} from 'date-fns';
import { format as formatTz, toDate, utcToZonedTime } from 'date-fns-tz';

export const formatDate = (
  value: Date | string | null,
  filterFormat = 'dd/MM/yyyy',
  parseFormat: string | null = null
): string | null => {
  if (!value) {
    return null;
  }

  let date: Date;

  if (typeof value === 'string') {
    if (parseFormat) {
      date = parse(value, parseFormat, new Date());
    } else {
      date = parseISO(value as string);
    }
  } else {
    date = value;
  }

  const clone = toDate(date);

  const d = utcToZonedTime(clone, 'Australia/Sydney');

  return formatTz(d, filterFormat, { timeZone: 'Australia/Sydney' });
};

export const formatDateTime = (value: Date | string | null, filterFormat = 'dd/MM/yyyy hh:mmaaa'): string | null => {
  return formatDate(value, filterFormat);
};

export const formatTime = (value: Date | string | null, filterFormat = 'hh:mmaaa'): string | null => {
  return formatDate(value, filterFormat);
};

export const formatTimeRange = (first: Date | string, second: Date | string, timeOnly = false): string | null => {
  return formatDate(first, timeOnly ? 'hh:mmaaa' : 'EEE dd/MM, hh:mmaaa') + ' - ' + formatDate(second, 'hh:mmaaa');
};

export const startAndEndOfWeek = (start: Date): { start: Date; end: Date } => ({
  start: startOfWeek(start, { weekStartsOn: 1 }),
  end: endOfWeek(start, { weekStartsOn: 1 }),
});

export const timeBetween = (time: Date, start: Date, end: Date): boolean => {
  const givenTime = new Date(formatTime(time) as string);
  const compareTime = new Date(formatTime(start) as string);
  const endTime = new Date(formatTime(end) as string);

  return givenTime >= compareTime && givenTime <= endTime;
};

export const lessThan = (time: Date, compare: Date, equalTo = true): boolean => {
  let _givenTime = setHours(new Date(), getHours(time));
  _givenTime = setSeconds(setMinutes(_givenTime, getMinutes(time)), 0);

  let _compareTime = setHours(new Date(), getHours(compare));
  _compareTime = setSeconds(setMinutes(_compareTime, getMinutes(compare)), 0);

  const givenTime = _givenTime;
  const compareTime = _compareTime;

  if (equalTo) {
    return givenTime <= compareTime;
  }

  return givenTime < compareTime;
};

export const moreThan = (time: Date, compare: Date, equalTo = true): boolean => {
  let _givenTime = setHours(new Date(), getHours(time));
  _givenTime = setSeconds(setMinutes(_givenTime, getMinutes(time)), 0);

  let _compareTime = setHours(new Date(), getHours(compare));
  _compareTime = setSeconds(setMinutes(_compareTime, getMinutes(compare)), 0);

  const givenTime = _givenTime;
  const compareTime = _compareTime;

  if (equalTo) {
    return givenTime >= compareTime;
  }

  return givenTime > compareTime;
};
