import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full grid grid-flow-col gap-2 place-items-center">
      <Link href="/">
        <p>Home</p>
      </Link>
      <Link href="/login">
        <p>Login</p>
      </Link>
      <Link href="/register">
        <p>Register</p>
      </Link>
    </nav>
  );
}
