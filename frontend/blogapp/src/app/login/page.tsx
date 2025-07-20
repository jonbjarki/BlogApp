"use client";

import { useAuth } from "@/components/AuthProvider";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const [error, setError] = useState("");

    const { loading, user } = useAuth();

    console.log("User:", user);
    console.log("Loading", loading);

    // Redirect to home if user is already logged in
    if (!!user) {
        window.location.href = "/";
        return null; // Prevent rendering the login form
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        if (process.env.NEXT_PUBLIC_API_URL === undefined) {
            throw new Error(
                "API_URL is not defined in the environment variables."
            );
        }
        let url = `${process.env.NEXT_PUBLIC_API_URL}/login`;

        if (rememberMe) {
            url += "?useCookies=true";
        } else {
            url += "?useSessionCookies=true";
        }

        console.log("Email:", email);
        console.log("Password:", password);
        try {
            const res = await axios.post(
                url,
                {
                    email,
                    password,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            console.log("Response", res);
            console.log("Data", res.data);
            if (res.status == 401) {
                setError("Invalid email or password.");
                return;
            } else if (res.status != 200) {
                setError(
                    "An unexpected error occurred. Please try again later."
                );
                console.error("Unexpected response: ", res);
                return;
            }

            window.location.href = "/"; // Redirect to home page on successful login
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    setError("Invalid email or password.");
                    return;
                }
                console.error("Unexpected error occured:", err);
                setError(
                    err.response.data.message ||
                        "An error occurred during login."
                );
            }
        }
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

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }
    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow flex flex-col gap-4">
            <h1 className="text-center text-2xl font-bold">Login</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 items-start"
            >
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
                <Link
                    href="/register"
                    className="underline hover:text-blue-600"
                >
                    Register here
                </Link>
            </p>
        </div>
    );
}
