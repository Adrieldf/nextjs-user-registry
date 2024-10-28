"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import DatePickerField from "@/components/DatePickerField";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAddUser } from "@/hooks/useAddUser";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  username: string;
  password: string;
  birthDate: Date | null;
}

const RegisterPage = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const { mutate: addUser, isPending } = useAddUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser(
      {
        firstName,
        lastName,
        email,
        mobileNumber,
        username,
        password,
        birthDate,
      },
      {
        onSuccess: () => toast.success("User saved successfully!"),
        onError: () => toast.error("Error while adding user, please try again later.")
      }
    );
  };

  return (
    <div className="flex h-min bg-slate-900 text-slate-100 min-h-screen p-4">
      <div className="w-full max-w-screen-lg bg-slate-800 text-slate-100 p-8 rounded-lg shadow-md overflow-y-auto h-min">
        <h2 className="text-2xl font-bold mb-6">Register user</h2>
        {/* {error && <Alert message={error} type="error" />}
        {success && <Alert message={success} type="success" />} */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4 mb-4 w-full">
            <InputField
              label="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              required
            />
            <InputField
              label="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputField
              label="Mobile Number"
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <InputField
              label="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <DatePickerField
            label="Birth Date"
            value={birthDate}
            onChange={(date) => setBirthDate(date)}
          />
          <button
            type="submit"
            className="w-full py-2 px-4 common-button"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
