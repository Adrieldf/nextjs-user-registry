"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url(/images/bg-nature-landscape.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative w-full max-w-md bg-slate-800 text-slate-100 p-8 rounded-lg shadow-md z-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome!</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-100"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 px-3 py-2 border border-gray-300 rounded-lg w-full common-input"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-100"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 px-3 py-2 border border-gray-300 rounded-lg w-full common-input"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 common-button transition"
          >
            Login
          </button>
        </form>
        <div className="flex flex-row justify-center align-middle pt-1">
          <span>Don&apos;t have a account?</span>
          <Link
            href="/register"
            className={`flex items-center hover:bg-gray-700`}
          >
            <span className="ml-4">Sign up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
