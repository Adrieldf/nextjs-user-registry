"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import Link from "next/link";
import ActionCellRenderer from "@/components/ActionCellRenderer";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

export default function UserListPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: users, isLoading, isError, error } = useFetchUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleViewUser = (userId: string) => {
    router.push(`/register/${userId}`);
  };

  const handleDeleteClick = (userId: string, userName: string) => {
    // Add logic to delete the user
    setSelectedUser({ id: userId, name: userName });
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUserMutation.mutate(selectedUser.id);
      if (deleteUserMutation.isSuccess) {
        queryClient.invalidateQueries({ queryKey: ["users"] }); // Refetch user list
        toast.success("User deleted successfully");
      }
    }
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => axios.delete(`api/users/${userId}`)
  });

  const columns = [
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params: { data: any }) => (
        <ActionCellRenderer
          data={params.data}
          onView={handleViewUser}
          onDelete={() =>
            handleDeleteClick(params.data.id, params.data.firstName)
          }
        />
      ),
      sortable: false,
      filter: false,
      width: 100,
    },
    {
      headerName: "First Name",
      field: "firstName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Last Name",
      field: "lastName",
      sortable: true,
      filter: true,
    },
    { headerName: "Username", field: "username", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    {
      headerName: "Created At",
      field: "createdAt",
      sortable: true,
      filter: true,
      valueFormatter: (params: { value: string | number | Date }) =>
        new Date(params.value).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      headerName: "Updated At",
      field: "updatedAt",
      sortable: true,
      filter: true,
      valueFormatter: (params: { value: string | number | Date }) =>
        new Date(params.value).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
  ];

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="flex h-min bg-slate-900 text-slate-100 min-h-screen p-4">
      <div className="w-full bg-slate-800 text-slate-100 p-8 rounded-lg shadow-md">
        <div
          className="ag-theme-alpine-dark"
          style={{ height: "600px", width: "100%" }}
        >
          <h1 className="text-2xl font-bold mb-4">Users List</h1>
          <div className="pb-4">
            <Link className="common-button" href="/register">
              Add User
            </Link>
          </div>
          <AgGridReact
            columnDefs={columns}
            rowData={users}
            pagination={true}
            paginationPageSize={20}
          />
        </div>
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
          userName={selectedUser?.name || ""}
        />
      </div>
    </div>
  );
}
