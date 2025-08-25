"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPlus } from "react-icons/fa";

export default function CreatePostButton() {
    const pathname = usePathname();

    return (
        <Link replace prefetch href={pathname + "?showForm=true"}>
            <button
                type="button"
                className="flex flex-row items-center gap-2 text-primary hover:text-white border border-primary hover:bg-primary/80 focus:ring-2 focus:outline-none focus:ring-primary/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                <FaPlus /> Create Post
            </button>
        </Link>
    );
}
