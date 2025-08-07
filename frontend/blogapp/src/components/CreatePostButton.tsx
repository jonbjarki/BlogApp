"use client";

import { Suspense, useState, lazy, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

export default function CreatePostButton() {
    const [isVisible, setIsVisible] = useState<Boolean>(false);
    const CreatePostForm = lazy(() => import("@/components/CreatePostForm"));

    const handleHide = () => {
        setIsVisible(false);
    };

    const handleShow = () => {
        setIsVisible(true);
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {!isVisible && (
                <button
                    onClick={handleShow}
                    className="rounded-lg bg-primary py-2 px-4 w-fit cursor-pointer hover:bg-primary/80 text-white flex align-middle items-center gap-2"
                >
                    <FaPlus /> New Post
                </button>
            )}

            {isVisible ? <CreatePostForm onCancel={handleHide} /> : null}
        </Suspense>
    );
}
