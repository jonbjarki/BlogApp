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
                <Link
                    replace
                    className="flex flex-row gap-2 items-center bg-primary px-4 py-2 shadow-lg"
                    role="button"
                    href={pathname + "?showForm=true"}
                >
                    <FaPlus /> Create Post
                </Link>
            )}
        </Suspense>
    );
}
