import { AxiosError } from 'axios';
import { camel } from '@/utils/string';
import { ref, watch } from '@/plugins/composition';

type ErrorObject = {
  [key: string]: string[];
};

type FormData = {
  [key: string]: unknown;
};

// type ErrorResponse = {
//   [key: string]: unknown;
// };

type ErrorsObject<T> = {
  [K in keyof T]: T[K];
};

export const useFormValidation = <T extends FormData>(formData: T) => {
  const valid = ref(false);

  const buildObject = () => {
    const obj = {} as ErrorObject;
    for (const [key] of Object.entries(formData)) {
      obj[key] = [];
    }
    return obj;
  };

  const errors = ref<ErrorsObject<T>>(buildObject() as T);

  const resetErrors = () => {
    errors.value = buildObject();
  };

  const mapErrors = (error: AxiosError) => {
    if (error.response?.status === 422) {
      for (const [key, value] of Object.entries(error.response.data.errors)) {
        errors.value[camel(key)].push(...(value as string[]));
      }
    } else {
      throw new Error(error.message);
    }
  };

  watch(formData, () => resetErrors());

  return {
    errors,
    mapErrors,
    valid,
  };
};
