export const formatPrice = (price: string | number): string => {
  return ((price as number) / 100).toLocaleString('en-AU', { style: 'currency', currency: 'AUD' });
};

export const minutesToHours = (minutes: number): number => {
  return Math.round((minutes / 60) * 100) / 100;
};
