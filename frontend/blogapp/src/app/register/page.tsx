"use client";

import { useAuth } from "@/components/AuthProvider";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { loading, user } = useAuth();

    if (!!user) {
        window.location.href = "/";
        return null; // Prevent rendering the registration form
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/account/register`;

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

        console.log("Email:", email);
        console.log("Password:", password);

        try {
            const res = await axios.post(
                url,
                {
                    email,
                    password,
                },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Response", res);
            console.log("Data", res.data);

            window.location.href = "/login"; // Redirect to login page on successful registration
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                console.error("Unexpected error occured:", err);
                setError(
                    err.response.data.message ||
                        "An error occurred during registration."
                );
            } else {
                console.error("Unexpected error:", err);
                setError(
                    "An unexpected error occurred. Please try again later."
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
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state while checking auth
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow flex flex-col gap-4">
            <h1 className="text-center text-2xl font-bold">Register</h1>
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
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button
                    type="submit"
                    className="border border-black p-1 px-2 shadow hover:bg-gray-100 cursor-pointer"
                >
                    Register
                </button>
            </form>
            <p>
                Already have an account?{" "}
                <Link href="/login" className="underline hover:text-blue-600">
                    Login here
                </Link>
            </p>
        </div>
    );
}
