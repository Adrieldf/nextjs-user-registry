"use client";

import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useAddUsers } from "@/hooks/debug/useAddUsers";
import { useRemoveUsers } from "@/hooks/debug/useRemoveUsers";
import Dropdown from "../Dropdown";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Topbar() {
  const queryClient = useQueryClient();
  const addUserMutation = useAddUsers();
  const removeUserMutation = useRemoveUsers();
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === 'unauthenticated') {
    //  router.push('/login');
    }
  }, [status, router]);

  const handleAddUser = () => {
    addUserMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Users added successfully!");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError: () =>
        toast.error(`Error while adding users, please try again later.`),
    });
  };

  const handleRemoveUser = () => {
    removeUserMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Users removed successfully!");
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError: () =>
        toast.error(`Error while removing users, please try again later.`),
    });
  };

  return (
    <div className="bg-slate-700 text-slate-100 p-4 flex justify-between align-center">
      <h1 className="text-lg font-bold">CE Tech Test</h1>
      <div>
        <Dropdown buttonText="Debug">
          <button
            onClick={handleAddUser}
            disabled={addUserMutation.isPending}
            className="p-2 common-button ml-2"
          >
            {addUserMutation.isPending ? "Adding..." : "Add Users"}
          </button>
          <button
            onClick={handleRemoveUser}
            disabled={removeUserMutation.isPending}
            className="p-2 common-button ml-2"
          >
            {removeUserMutation.isPending ? "Removing..." : "Remove Users"}
          </button>
        </Dropdown>
      </div>
    </div>
  );
}
