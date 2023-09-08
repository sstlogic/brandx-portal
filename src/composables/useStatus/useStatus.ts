import { computed, reactive, readonly } from '@/plugins/composition';

interface IStatusState {
  message: string | null;
  error: boolean;
}

const initialState: IStatusState = {
  message: null,
  error: false,
};

const state = reactive({ ...initialState });

export const useStatus = () => {
  const message = computed(() => state.message);
  const isError = computed(() => state.error);

  const clearMessage = (): void => {
    state.message = null;
  };

  const setMessage = (statusMessage: string): void => {
    state.message = statusMessage;
    setTimeout(() => {
      clearMessage();
    }, 2000);
  };

  const setErrorMessage = (statusMessage: string): void => {
    state.message = statusMessage;
    state.error = true;
    setTimeout(() => {
      clearMessage();
      state.error = false;
    }, 20000);
  };

  const statusState = readonly(state);

  return { statusState, setMessage, message, setErrorMessage, clearMessage, isError };
};
