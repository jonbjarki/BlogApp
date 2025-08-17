"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState, lazy, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

export default function CreatePostButton() {
    const [isVisible, setIsVisible] = useState<Boolean>(false);
    const pathname = usePathname();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {!isVisible && (
                // <button
                //     onClick={handleShow}
                //     className="rounded-lg bg-primary py-2 px-4 w-fit cursor-pointer hover:bg-primary/80 text-white flex align-middle items-center gap-2"
                // >
                //     <FaPlus /> New Post
                // </button>
                <Link className="flex flex-row gap-2 items-center bg-primary px-4 py-2 shadow-lg" href={pathname + "?showForm=true"}>
                    <FaPlus /> Create Post
                </Link>
            )}
        </Suspense>
    );
}
