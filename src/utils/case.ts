import { KebabCasedProperties, SnakeCasedProperties } from 'type-fest';
import { kebab } from './string';
import { snakeCase } from 'snake-case';

export const snakeKeys = <D extends { [K in keyof D]: D[K] }>(object: D): SnakeCasedProperties<D> => {
  const mapped = Object.create({});

  const options = {
    splitRegexp: /([a-z])([A-Z0-9])/g,
  };

  Object.keys(object).map(function (key: string) {
    mapped[snakeCase(key, options)] = object[key as keyof typeof object];
  });

  return mapped;
};

export const kebabKeys = <D extends { [K in keyof D]: D[K] }>(object: D): KebabCasedProperties<D> => {
  const mapped = Object.create({});

  Object.keys(object).map(function (key: string) {
    mapped[kebab(key)] = object[key as keyof typeof object];
  });

  return mapped;
};

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
