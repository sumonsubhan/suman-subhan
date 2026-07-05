"use client";

import { useState } from "react";
import { login } from "@/actions/login";
import Logo from "@/components/logo/Logo";

export default function LoginPage() {
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");

    const formData = new FormData(e.target);

    const result = await login(formData);

    if (!result?.success) {
      setMessage(result.message);
    }
  }

  return (
    <section className="flex flex-col min-h-screen items-center justify-center bg-gray-100">
        <div className="my-6">
            <Logo></Logo>
        </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
      >
        
        <h1 className="mb-8 text-center text-3xl font-bold">
          Admin Login
        </h1>

        <div className="mb-5">
          <label>Email</label>

          <input
            type="email"
            name="email"
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="mb-5">
          <label>Password</label>

          <input
            type="password"
            name="password"
            required
            className="input input-bordered w-full"
          />
        </div>

        {message && (
          <p className="mb-4 text-red-500">
            {message}
          </p>
        )}

        <button
          className="btn btn-primary w-full"
          type="submit"
        >
          Login
        </button>
      </form>
    </section>
  );
}