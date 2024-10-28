import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export function useRemoveUsers() {
  return useMutation({
    mutationFn: () => {
      return axios.delete("/api/debug/users/remove");
    },
  });
}
