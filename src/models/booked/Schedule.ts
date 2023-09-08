import { Resource } from './Resource';

export type Schedule = {
  id: number;
  name: string;
  resources: Resource[];
  isDefault: boolean;
};
