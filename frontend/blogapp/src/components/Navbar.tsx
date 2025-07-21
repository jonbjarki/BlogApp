import Link from "next/link";
import { getServerUser } from "@/lib/auth";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
    const user = await getServerUser();
    const isAuthenticated = !!user;

    console.log("User in Navbar:", user);

    return (
        <nav className="w-full grid grid-flow-col gap-2 place-items-center">
            <Link href="/">
                <p>Home</p>
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

            {/* Only shows these links if the user is logged in */}
            {isAuthenticated && <LogoutButton />}
        </nav>
    );
}
