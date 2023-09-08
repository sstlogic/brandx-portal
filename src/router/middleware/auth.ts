import { MiddlewareContext } from './types';
import { useAuthStore } from '@/composables/useAuthStore';

export const auth = async ({ next }: MiddlewareContext): Promise<void> => {
  const { isAuthed, checkAuth, refreshState } = useAuthStore();

  // await refreshState();

  // we are authed so return early
  if (isAuthed.value) {
    return next();
  }

  // if not authed, let's check the auth on the server
  await checkAuth();

  // if after checking the auth, we still aren't authed, return to login
  if (!isAuthed.value) {
    return next({ name: 'login' });
  }

  // otherwise, we must now be authed
  return next();
};
