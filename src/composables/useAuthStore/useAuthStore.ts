import { User } from '@/models/User';
import { computed, reactive, readonly } from '@/plugins/composition';
import { useCreatingBooking } from '@/composables/useCreatingBooking';

interface IAuthState {
  user: User | null | never;
}

const initialState: IAuthState = {
  user: null,
};

const state = reactive({ ...initialState });

export const useAuthStore = () => {
  const authState = readonly(state);

  const isAuthed = computed(() => !!state.user);

  const user = computed(() => state.user as User);

  const isMember = computed(() => user.value?.data.member);

  const checkAuth = async (): Promise<void> => {
    const localUser = getLocalAuth();

    if (localUser?.user) {
      await storeLogin(new User(localUser.user?.data));
    } else {
      await retryAuth();
    }
  };

  const retryAuth = async (): Promise<void> => {
    try {
      const user = await User.getCurrentUser();
      return await storeLogin(user);
    } catch (e) {
      return clearLocalAuth();
    }
  };

  const refreshState = async (): Promise<void> => retryAuth();

  const storeLogin = async (user: User): Promise<void> => {
    state.user = user;
    setLocalAuth(state);
  };

  const setLocalAuth = (state: IAuthState): void => {
    window.localStorage.setItem('auth', JSON.stringify(state));
  };

  const getLocalAuth = (): IAuthState | null => {
    const storedAuth = window.localStorage.getItem('auth');
    return storedAuth ? JSON.parse(storedAuth) : null;
  };

  const clearLocalAuth = (): void => {
    window.localStorage.clear();
  };

  const storeLogout = (): void => {
    const { clearSlots, repeatingType } = useCreatingBooking();
    clearSlots();
    repeatingType.value = 'single';

    clearLocalAuth();
    state.user = null;
  };

  return {
    state,
    authState,
    isAuthed,
    storeLogin,
    setLocalAuth,
    getLocalAuth,
    storeLogout,
    user,
    checkAuth,
    refreshState,
    clearLocalAuth,
    isMember,
  };
};
