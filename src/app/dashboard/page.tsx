"use client";

import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

export default function DashboardPage() {
  const [rowData, setRowData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setRowData(data);
    };

    fetchData();
  }, []);

  const columnDefs = [
    { headerName: "ID", field: "id", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Name", field: "name", sortable: true, filter: true },
    {
      headerName: "Created At",
      field: "createdAt",
      sortable: true,
      filter: true,
    },
  ];

  return (
    <div className="container p-4 flex items-center">
      <div
        className="ag-theme-alpine-dark"
        style={{ height: "600px", width: "100%" }}
      >
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>{" "}
    </div>
  );
}
