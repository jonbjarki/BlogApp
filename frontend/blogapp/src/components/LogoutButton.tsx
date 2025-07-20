"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/logout`,
                {
                    withCredentials: true,
                }
            );

            // redirect to home page on logout
            if (res.status === 200) {
                router.push("/");
            }
        } catch (error) {
            console.error("Error occured during logout", error);
            return null;
        }
    };

    return (
        <button
            className="text-white px-4 py-2 rounded cursor-pointer"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}
