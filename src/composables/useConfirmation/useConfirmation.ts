import { ref } from '@/plugins/composition';

let resolvePromise: (confirmed: boolean) => void;

export const pending = ref(false);
export const confirmed = ref(false);
export const message = ref<null | string | undefined>('Are you sure?');
export const confirmText = ref('confirm');
export const confirmType = ref('delete');
export const cancelText = ref('cancel');
export const confirmTitle = ref('Confirm');

export const cancel = (): void => {
  resolvePromise(false);
  pending.value = false;
  confirmed.value = false;
};

export const confirm = (): void => {
  resolvePromise(true);
  pending.value = false;
  confirmed.value = true;
};

type Config = {
  confirmText?: string;
  cancelText?: string;
  confirmType?: 'warn' | 'confirm';
  confirmTitle?: string;
};

const deleteConfigPreset = {
  confirmText: 'Delete',
  cancelText: 'Cancel',
  confirmType: 'warn',
  confirmTitle: 'Confirm',
};

export const useConfirmation = () => {
  const confirmation = (text: string, config?: Config): Promise<unknown> => {
    pending.value = true;

    message.value = text;

    if (config?.cancelText) {
      cancelText.value = config.cancelText;
    }

    if (config?.confirmType) {
      confirmType.value = config.confirmType;
    }

    if (config?.confirmText) {
      confirmText.value = config.confirmText;
    }

    if (config?.confirmTitle) {
      confirmTitle.value = config.confirmTitle;
    }

    return new Promise((resolve) => {
      resolvePromise = (confirmed: boolean) => resolve(confirmed);
    });
  };

  const deleteConfirmation = (text: string): Promise<unknown> => {
    return confirmation(text, deleteConfigPreset as Config);
  };

  return {
    confirmation,
    deleteConfirmation,
  };
};
