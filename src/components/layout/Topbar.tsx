"use client";

import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useAddUsers } from "@/hooks/debug/useAddUsers";
import { useRemoveUsers } from "@/hooks/debug/useRemoveUsers";
import Dropdown from "../Dropdown";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Topbar() {
  const queryClient = useQueryClient();
  const addUserMutation = useAddUsers();
  const removeUserMutation = useRemoveUsers();
  const { data: session, status } = useSession();

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
    <div className="bg-slate-800 text-slate-100 p-4 flex justify-between align-center">
      <h1 className="text-lg font-bold">CE Tech Test</h1>
      <div className="flex ">
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
        {status === "loading" ? (
          <p></p>
        ) : session ? (
          <div className="flex items-center space-x-4">
            <span className="ml-4 common-text whitespace-nowrap">
              Welcome {session?.user?.name}!
            </span>
            <button onClick={() => signOut()} className="accent-button">
              Logout
            </button>
          </div>
        ) : (
          <Link href="/login" className="ml-4 accent-button">
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  );
}
