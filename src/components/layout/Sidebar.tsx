"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiUser, FiHome } from "react-icons/fi";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div
      className={`bg-slate-700 text-slate-100 transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleSidebar}
        className="p-4 text-gray-300 hover:bg-gray-700 flex justify-center"
      >
        <FiMenu size={24} />
      </button>

      {/* Navigation Links */}
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
      </nav>
    </div>
  );
}
