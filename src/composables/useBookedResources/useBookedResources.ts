import { Resource } from '@/models/booked/Resource';
import { useApi } from '../useApi';
import { ResourceResponse } from '../useApi/types';

export const useBookedResources = () => {
  const { get } = useApi();

  const getResources = async () => {
    const response = await get<ResourceResponse<Resource[]>>('/resources');

    return response.data;
  };

  const getResource = async (id: number) => {
    const response = await get<ResourceResponse<Resource>>('/resources/' + id);

    return response.data;
  };

  return {
    getResources,
    getResource,
  };
};
