import { User } from '@/models/User';
import { computed, reactive, readonly } from '@/plugins/composition';
import { useCreatingBooking } from '@/composables/useCreatingBooking';

interface IAuthState {
  user: User | null | never;
}
interface IAuthTokenState {
  Token: string | null | never;
}

const initialState: IAuthState = {
  user: null,
};
const initialTokenState: IAuthTokenState = {
  Token: null,
};

const state = reactive({ ...initialState });
const tokenState = reactive({ ...initialTokenState });

export const useAuthStore = () => {
  const authState = readonly(state);

  const isAuthed = computed(() => !!state.user);

  const user = computed(() => state.user as User);
  const token = computed(() => tokenState.Token as string);

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
    state.user = null;
    tokenState.Token = null;
    window.localStorage.clear();
  };

  const setLocalToken = (token: string): void => {
    tokenState.Token = token;
    window.localStorage.setItem('token', JSON.stringify(tokenState));
  };

  const getLocalToken = (): string | null => {
    const storedToken = window.localStorage.getItem('token');
    // console.log(storedToken, 'storedToken');
    const responseToken = storedToken ? JSON.parse(storedToken) : null;
    if (responseToken) {
      tokenState.Token = responseToken.Token;
    }
    return responseToken;
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
    token,
    setLocalToken,
    getLocalToken,
  };
};
