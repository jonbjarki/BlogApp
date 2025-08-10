"use client";

import { createContext, useContext, useEffect, useState } from "react";
import User from "@/types/UserTypes";
import axios from "axios";
import { FETCH_USER_DETAILS_URL } from "@/lib/constants";

export interface UserContextType {
    loading: boolean;
    user: User | undefined;
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    // Check if user is authenticated on mount
    useEffect(() => {
        const checkAuth = async (): Promise<User | undefined> => {
            try {
                console.log("Response URL: ", `${FETCH_USER_DETAILS_URL}`);
                const response = await axios(`${FETCH_USER_DETAILS_URL}`, {
                    withCredentials: true,
                });

                console.log(response);
                if (response.status === 200) {
                    console.log("Response Data:", response.data);
                    return response.data as User;
                }
            } catch (error) {
                // Check if error is an expected 404 or 401 status (user not logged in)
                if (axios.isAxiosError(error)) {
                    if (
                        error.response?.status === 404 ||
                        error.response?.status === 401
                    ) {
                        return undefined;
                    }
                }

                console.error("Unexpected error occured:", error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth()
            .then((userData) => {
                setUser(userData);
                setLoading(false);
                console.log("Loading:", loading);
            })
            .catch((error) => {
                console.error("Error occured", error);
            });
    }, [loading]);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useAuth must be used wrapped within an AuthProvider");
    }
    return context;
};
