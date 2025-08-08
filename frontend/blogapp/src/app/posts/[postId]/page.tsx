"use client";

import { BlogPostType } from "@/types/BlogPostType";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

interface ViewPostPageProps {
    params: { postId: string };
}

export default function ViewPostPage({
    params: { postId },
}: ViewPostPageProps) {
    const [post, setPost] = useState<BlogPostType | null>(null);
    const loading = post === null;

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/posts/${postId}`);
            const data = await response.json();
            setPost(data);
        };
        fetchPost();
    }, [postId]);

    return (
        <>
            <ClipLoader
                loading={loading}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2"
            />
            <div>
                <h1>{post?.title}</h1>
            </div>
        </>
    );
}
