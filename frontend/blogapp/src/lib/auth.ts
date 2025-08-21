import axios from "axios";
import { cookies } from "next/headers";
import User from "@/types/UserTypes"
import { FETCH_USER_DETAILS_URL } from "./constants";

export async function getUserAction() {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(".AspNetCore.Identity.Application");

    try {
        const res = await axios.get(
            `${FETCH_USER_DETAILS_URL}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Cookie: authCookie
                        ? `${authCookie.name}=${authCookie.value}`
                        : "",
                },
                withCredentials: true,
            }
        );
        return res.data as User;
    } catch (error) {
        // Check if error is expected (user is not logged in)
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            console.log("User not logged in");
            return null;
        }
        console.error("Unexpected error fetching user in getServerUser:", error);
        return null;
    }
}
