'use client';

import { createContext, useEffect, useState } from "react";
import User from "@/types/UserType";
import axios from "axios";
import { useRouter } from "next/router";

export const UserContext = createContext<User | undefined>({ email: "" });


export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);

    const router = useRouter();

    // Check if user is authenticated on mount
    useEffect(() => {
        const checkAuth = async (): Promise<User | undefined> => {
            try {
                const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}/manage/info`);
                if (response.status === 200) {
                    setIsAuthenticated(true);
                    return response.data as User;
                } else if (response.status === 401) {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Error checking authentication status:", error);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }

        checkAuth().then((userData) => {
            setUser(userData);
        });
    }, [])

    // Return loading state until authentication check is complete
    if (loading) {
        return <div>Loading...</div>;
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        router.push("/login");
        return null;
    }

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}