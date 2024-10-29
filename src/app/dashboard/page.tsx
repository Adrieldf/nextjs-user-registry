"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface UserCounts {
  totalUsers: number;
  activeUsers: number;
}

export default function DashboardPage() {
  const { status } = useSession();
  const router = useRouter();

  const { data, isLoading } = useQuery<UserCounts>({
    queryKey: ["userCounts"],
    queryFn: async () => {
      const response = await axios.get("api/users/count");
      return response.data;
    },
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading" || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex h-min bg-slate-900 text-slate-100 min-h-screen p-4">
      <div className="w-full bg-slate-800 text-slate-100 p-8 rounded-lg shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            <div className="bg-slate-700 text-slate-100 p-4 rounded-lg shadow">
              <p className="text-lg font-semibold">Total Users</p>
              <p className="text-2xl font-bold">{data?.totalUsers ?? 0}</p>
            </div>

            <div className="bg-slate-700 text-slate-100 p-4 rounded-lg shadow">
              <p className="text-lg font-semibold">Active Users</p>
              <p className="text-2xl font-bold">{data?.activeUsers ?? 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
