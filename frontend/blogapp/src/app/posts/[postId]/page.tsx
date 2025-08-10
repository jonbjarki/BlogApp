"use client";

import CenteredSpinner from "@/components/CenteredSpinner";
import { FETCH_POSTS_URL } from "@/lib/constants";
import { BlogPostType } from "@/types/BlogPostType";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ViewPostPage() {
    const [post, setPost] = useState<BlogPostType | null>(null);
    const loading = post === null;
    const { postId } = useParams<{ postId: string }>();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`${FETCH_POSTS_URL}/${postId}`);
            const data = await response.json();
            console.log("Fetched post data:", data);
            setPost(data);
        };
        fetchPost();
    }, [postId]);

    return (
        <>
            <CenteredSpinner loading={loading} />
            {!loading && (
                <div>
                    <h1>{post?.title}</h1>
                    <p>{post?.description}</p>
                    <p>By: {post?.author.userName}</p>
                    <hr />

                    <p>{post?.content}</p>
                </div>
            )}
        </>
    );
}
