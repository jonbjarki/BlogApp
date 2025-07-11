"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    let url = `${process.env.NEXT_PUBLIC_API_URL}/login`;
    if (url === undefined) {
      throw new Error("API_URL is not defined in the environment variables.");
    }

    if (rememberMe) {
      url += "?useCookies=true";
    } else {
      url += "?useSessionCookies=true";
    }

    console.log("Email:", email);
    console.log("Password:", password);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Response", res);
    console.log("Body", await res.text());

    if (!res.ok || res.status !== 200) {
      const errorData = await res.json();
      setError(errorData.message || "Login failed. Please try again.");
      return;
    }

    window.location.href = "/"; // Redirect to home page on successful login
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "rememberMe") {
      setRememberMe(e.target.checked);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow flex flex-col gap-4">
      <h1 className="text-center text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-start">
        <div>
          <label className="mr-2">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="mr-2">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="select-none">
            <input
              type="checkbox"
              name="rememberMe"
              checked={rememberMe}
              onChange={handleChange}
              className="mr-2"
            />
            Remember Me
          </label>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          type="submit"
          className="border border-black p-1 px-2 shadow hover:bg-gray-100 cursor-pointer"
        >
          Sign In
        </button>
      </form>
      <p>
        {"Don't"} have an account?{" "}
        <Link href="/register" className="underline hover:text-blue-600">
          Register here
        </Link>
      </p>
    </div>
  );
}
