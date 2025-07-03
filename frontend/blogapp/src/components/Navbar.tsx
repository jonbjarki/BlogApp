import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full grid place-items-center">
      <Link href="/">
        <p>Home</p>
      </Link>
    </nav>
  );
}
