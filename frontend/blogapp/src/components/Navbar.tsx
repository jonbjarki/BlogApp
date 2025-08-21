import Link from "next/link";
import { getUserAction } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
    const user = await getUserAction();
    const isAuthenticated = !!user;

    console.log("User in Navbar:", user);

    return (
        <nav className="w-full bg-surface grid grid-cols-3 grid-rows-1 gap-2 px-2 items-center justify-center">
            {/* nav left */}
            <div></div>

            <div className="flex flex-row items-center justify-center gap-2">
                <Link href="/posts">
                    <p>Posts</p>
                </Link>

                {/* Does not show these links if the user is logged in */}
                {!isAuthenticated && (
                    <>
                        <Link href="/login">
                            <p>Login</p>
                        </Link>
                        <Link href="/register">
                            <p>Register</p>
                        </Link>
                    </>
                )}
            </div>
            {/* Only shows these links if the user is logged in */}
            <div>
                {isAuthenticated && (
                    <div className="justify-self-end flex flex-row gap-2 items-center">
                        <Link href="/profile">
                            <p>Profile</p>
                        </Link>
                        <LogoutButton />
                    </div>
                )}
            </div>
        </nav>
    );
}
