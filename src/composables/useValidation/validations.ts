const emailRegex =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

const mixedCase = /^((?=\S*?[A-Z ])(?=\S*?[a-z ])((?=\S*?[0-9 ])|(?=\S*?[^\w*])).{8,})$/;

const numericRegex = /^[0-9]*$/;

type RuleResult = string | boolean;

type ValidationRule = (v: string) => RuleResult;

export const email =
  (message = 'Must be a valid email') =>
  (v: string | null): string | boolean =>
    !v || (!!v && emailRegex.test(v)) || message;

export const required =
  (message = 'Field is required') =>
  (v: string | null): RuleResult =>
    !!v || message;

export const inArray =
  <T>(items: T[]) =>
  <V extends T>(v: V): RuleResult =>
    items.includes(v) || 'Value must be included in the following options: ' + items.join(', ');

export const password = (): ValidationRule[] => [
  (v: string): RuleResult => v.length >= 8 || 'Password must be at least 8 characters',
  (v: string): RuleResult =>
    mixedCase.test(v) || 'Must contain uppercase and lowercase letters and one number or special character',
];

export const numeric = (v: string): RuleResult => !v || numericRegex.test(v) || 'Can only contain numbers from 0-9';

export const mobile = (): ValidationRule[] => [
  (v: string): RuleResult => !v || v.length === 10 || 'Mobile number must have 10 digits',
];

export const minLength =
  (min: number) =>
  (v: string): RuleResult =>
    v.length > min || `Value must be greater than ${min} characters`;

export const min =
  (min: number) =>
  (v: number): RuleResult =>
    v > min || `Value must be greater than ${min}`;

export const minPrice =
  (min: number) =>
  (v: string): RuleResult => {
    if (!v) return true;
    const number = Number(v.replace(/[^0-9.-]+/g, ''));
    return number > min || `Value must be greater than $${min}`;
  };

export const maxPrice =
  (max: number) =>
  (v: string): RuleResult => {
    if (!v) return true;
    const number = Number(v.replace(/[^0-9.-]+/g, ''));
    return number < max || `Value must be less than $${max}`;
  };

export const rules = {
  email: email(),
  required: required(),
  password: password(),
  mobile: mobile(),
  min,
  minPrice,
  maxPrice,
  numeric,
  inArray,
  minLength,
};
