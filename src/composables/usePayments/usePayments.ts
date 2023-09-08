import { SetupIntent } from '@stripe/stripe-js';
import { useApi } from '../useApi';

export const usePayments = () => {
  const { get, post } = useApi();

  const getSetupIntent = async () => {
    return await get<{ intent: SetupIntent }>('/payment-methods/setup');
  };

  const getPaymentMethods = async () => {
    return await get('/payment-methods');
  };

  const getDefaultPaymentMethod = async () => {
    return await get('/payment-methods/default');
  };

  return {
    getSetupIntent,
    getPaymentMethods,
    getDefaultPaymentMethod,
  };
};
