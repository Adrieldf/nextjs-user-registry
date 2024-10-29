import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface AddUserParams {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  username: string;
  password: string;
  birthDate: Date | null;
}

export function useAddUser(onSuccessCallback: () => void) {
  return useMutation({
    mutationFn: async (userData: AddUserParams) => {
      const response = await axios.post("/api/users", userData);
      return response.data;
    },
    onSuccess: () => onSuccessCallback()
  });
}
