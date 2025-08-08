"use client";
import { useAuth } from "@/components/AuthProvider";
import { ClipLoader } from "react-spinners";

export default function ProfilePage() {
    const { loading, user } = useAuth();

    if (loading) {
        return (
            <ClipLoader
                loading={loading}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2"
            />
        );
    }

    return (
        <div>
            <h1>Hello {user?.userName}</h1>
        </div>
    );
}
