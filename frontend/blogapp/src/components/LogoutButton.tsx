"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/logout`,
                {},
                {
                    withCredentials: true, // Config object with credentials
                }
            );
            console.log("Logout response:", res);
            // redirect to home page on logout
            if (res.status === 200) {
                if (window.location.pathname !== "/") {
                    router.push("/");
                }
                else {
                    // If already on home page, force refresh
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error("Error occured during logout", error);
            return null;
        }
    };

    return (
        <button
            className="px-4 py-2 rounded cursor-pointer"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}
