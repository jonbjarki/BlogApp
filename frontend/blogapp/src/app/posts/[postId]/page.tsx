"use client";

import CenteredSpinner from "@/components/CenteredSpinner";
import { FETCH_POSTS_URL, POST_FALLBACK_IMAGE } from "@/lib/constants";
import { BlogPostFetchResponse, BlogPostType } from "@/types/BlogPostType";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCalendar, FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";
import ImageWithFallback from "@/components/ImageWithFallback";
import ReactMarkdown from "react-markdown";

export default function ViewPostPage() {
    const [post, setPost] = useState<BlogPostType | null>(null);
    const loading = post === null;
    const { postId } = useParams<{ postId: string }>();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`${FETCH_POSTS_URL}/${postId}`);
            const data = (await response.json()) as BlogPostFetchResponse;
            console.log("Fetched post data:", data);

            setPost({
                ...data,
                dateCreated: new Date(data.dateCreated), // Converts timestamp string to Date object
            });
        };

        fetchPost();
    }, [postId]);

    return (
        <>
            <CenteredSpinner loading={loading} />
            {!loading && (
                <main className="flex justify-center w-3xl h-full">
                    <article className="mt-8 w-full h-full">
                        <h1 className="text-5xl font-medium">{post.title}</h1>
                        <p className="flex text-primary items-center gap-2 h-8">
                            <FaCalendarAlt />
                            {post.dateCreated.toLocaleDateString()}
                        </p>
                        <span className="relative w-full my-8 h-80 block">
                            <ImageWithFallback
                                imageUrl={post.coverImageUrl}
                                fallbackUrl={POST_FALLBACK_IMAGE}
                                className="rounded-xl object-cover"
                                fill
                                alt={post.title}
                            />
                        </span>

                        <div className="mt-8 prose max-w-none">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                        </div>
                    </article>
                </main>
            )}
        </>
    );
}
