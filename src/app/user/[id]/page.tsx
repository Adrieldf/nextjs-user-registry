"use client";

import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  email: string;
  name: string;
}

async function fetchUserData(userId: string): Promise<User> {
  const response = await fetch(`/api/user?id=${userId}`, {
    cache: "no-store",
  });

  return await response.json();
}

export default function UserPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: async () => fetchUserData(id),
  });
  // Use TanStack Query to fetch the user data
  //   const { data, error, isPending } = useQuery<User>(
  //     ["user", id], // Unique query key using user ID
  //     () => fetchUserData(id) // Function to fetch the data
  //   );

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error fetching user data: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">User Details</h1>
      <p className="mt-4">ID: {data?.id}</p>
      <p>Email: {data?.email}</p>
      <p>Name: {data?.name}</p>
      <div>{isFetching ? "Updating..." : ""}</div>
    </div>
  );
}
