import { MiddlewareContext } from './types';
import { useAuthStore } from '@/composables/useAuthStore';

export const member = async ({ next }: MiddlewareContext): Promise<void> => {
  const { user } = useAuthStore();

  // if after checking the auth, we still aren't authed, return to login
  if (!user.value.data.member) {
    return next(false);
  }

  // otherwise, we must now be authed
  return next();
};
