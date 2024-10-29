"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiUser, FiHome } from "react-icons/fi";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
 

  return (
    <div
      className={`bg-slate-800 text-slate-100 transition-all duration-300 flex flex-col 
      ${ isSidebarOpen ? "w-64" : "w-16" } w-min`}
    >
      <button
        onClick={toggleSidebar}
        className="p-4 text-gray-300 hover:bg-gray-700 flex justify-start"
      >
        <FiMenu size={24} />
      </button>

      <nav className="mt-4">
        <Link
          href="/dashboard"
          className={`flex items-center p-4 hover:bg-gray-700 ${
            isSidebarOpen ? "justify-start" : "justify-center"
          }`}
        >
          <FiHome size={24} />
          {isSidebarOpen && <span className="ml-4">Dashboard</span>}
        </Link>

        <Link
          href="/userList"
          className={`flex items-center p-4 hover:bg-gray-700 ${
            isSidebarOpen ? "justify-start" : "justify-center"
          }`}
        >
          <FiUser size={24} />
          {isSidebarOpen && <span className="ml-4">Users</span>}
        </Link>

        {/* <Link
          href="/logout"
          className={`mt-auto flex items-center p-4 hover:bg-gray-700${
            isSidebarOpen ? "justify-start" : "justify-center"
          }`}
        >
          <FiLogOut size={24} />
          {isSidebarOpen && <span className="ml-4">Logout</span>}
        </Link> */}
      </nav>
    </div>
  );
}
