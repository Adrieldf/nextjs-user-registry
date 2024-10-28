import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function useAddUsers() {
  return useMutation({
    mutationFn: () => {
      return axios.post("/api/debug/users/insert");
    },
  });
}
