"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useFetchUsers } from "@/hooks/useFetchUsers";
import Link from "next/link";

export default function UserListPage() {
  const { data: users, isLoading, isError, error } = useFetchUsers();
  const columns = [
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
  ];

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="container p-4 flex items-center">
        
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
      </div>{" "}
    </div>
  );
}
