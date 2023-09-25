import { useApi } from '@/composables/useApi';
import { LoginCredentials, ResourceResponse } from '@/composables/useApi/types';
import { useAuthStore } from '@/composables/useAuthStore';
import { snakeKeys } from '@/utils/case';
import { BaseModel } from '../BaseModel';
import { BookedUser } from '../booked/BookedUser';

export type UserData = {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  member: boolean;
  memberSince: string;
  memberExpiry: string;
  memberRenewal: string;
  organisation: boolean;
  autoRenew: boolean;
  last4: string;
  existingMember: boolean;
  customAttributes: never;
};

export type ExistsResponse = { email: string; exists: boolean };

export class User extends BaseModel<UserData> {
  static async getCurrentUser(): Promise<User> {
    const { get } = useApi();
    const response = await get('/user', {
      name: 'Get Current User',
    });
    return new User(response.data);
  }

  getBookedUser = async (): Promise<BookedUser> => {
    const { get } = useApi();

    const response = await get<ResourceResponse<BookedUser>>('/user/booked');

    return response.data;
  };

  static async login(credentials: LoginCredentials): Promise<User> {
    const { login } = useApi();
    const response = await login(credentials);

    return new User(response.data);
  }

  static async logout(): Promise<void> {
    const { logout: logoutApi } = useApi();
    const response = await logoutApi();
    const { storeLogout } = useAuthStore();
    storeLogout();
    return response;
  }

  static async existsByEmail(email: string): Promise<boolean> {
    const { post, getCsrfCookie } = useApi();
    await getCsrfCookie();
    const { exists } = await post<ExistsResponse>('/users/exists', { email });

    return exists;
  }

  makePayment = async () => {
    const { post } = useApi();
    return await post(`/users/${this.uuid}/checkout/payment`, {}).catch((error) => Promise.reject(error));
  };

  updateUser = async (data: BookedUser): Promise<boolean> => {
    const { put } = useApi();

    const response = await put(`/users/${this.uuid}`, snakeKeys(data));

    return response;
  };

  getSubscriptionPrice = async (): Promise<number> => {
    const { get } = useApi();

    return await get<number>(`/users/${this.uuid}/subscription-price`);
  };
}
