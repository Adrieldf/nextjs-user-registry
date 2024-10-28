import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useFetchUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
    const response = await axios.get('/api/users');
    return response.data;
  }});
}
