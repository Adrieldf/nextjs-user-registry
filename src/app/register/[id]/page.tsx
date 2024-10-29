"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import InputField from "@/components/InputField";
import DatePickerField from "@/components/DatePickerField";
import { useSession } from "next-auth/react";

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const queryClient = useQueryClient();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const { isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(`/api/users/${id}`);
      console.log("user data", response.data);
      if (response) {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setMobileNumber(response.data.mobileNumber);
        setEmail(response.data.email);
        setUsername(response.data.username);
        setBirthDate(response.data.dateOfBirth);
      }
      return response.data;
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (updatedData: any) =>
      axios.put(`/api/users/${id}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Refetch user data after update
      toast.success("User updated successfully");
      router.push("/userList");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate({
      firstName,
      lastName,
      email,
      mobileNumber,
      username,
      birthDate,
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="flex h-min bg-slate-900 text-slate-100 min-h-screen p-4">
      <div className="w-full max-w-screen-lg bg-slate-800 text-slate-100 p-8 rounded-lg shadow-md overflow-y-auto h-min">
        <h2 className="text-2xl font-bold mb-6">Edit user</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-4 mb-4 w-full">
            <InputField
              label="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <InputField
              label="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
          </div>
          <DatePickerField
            label="Birth Date"
            value={birthDate}
            onChange={(date) => setBirthDate(date)}
          />
          <button type="submit" className="w-full py-2 px-4 common-button">
            {"Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
