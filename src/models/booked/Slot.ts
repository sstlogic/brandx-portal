import { Reservation } from './Reservation';
import { Resource } from './Resource';

export type Slot = {
  uuid: string;
  slotSpan: number;
  isReserved: boolean;
  label: string;
  isReservable: boolean;
  color: string;
  startDateTime: string | Date;
  endDateTime: string | Date;
  reservation: Reservation;
  date: string;
  resource: Resource;
  duration: number;
  selected: boolean;
};
