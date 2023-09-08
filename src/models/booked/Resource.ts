import { Slot } from './Slot';

export type Resource = {
  id: number;
  name: string;
  slots: Slot[];
  status: {
    id: number;
    name: string;
  };
  description: string | null;
  scheduleId: number;
  capacity: string | number | null;
  location: string | null;
  notes: string;
};
