import { ref } from '@/plugins/composition';

type UseLoaderConfig = { delay?: number; initial?: boolean };

export const useLoader = (config?: UseLoaderConfig) => {
  const loading = ref(config?.initial ?? false);

  const withLoader = async (callback: () => unknown) => {
    loading.value = true;

    return new Promise((resolve) => {
      setTimeout(async () => {
        let result;

        try {
          result = await callback();
        } catch (e) {
          loading.value = false;
        }

        loading.value = false;
        resolve(result);
      }, config?.delay ?? 0);
    });
  };

  return { loading, withLoader };
};
