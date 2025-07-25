"use client";

import { BlogPostType } from "@/types/BlogPostType";
import axios from "axios";
import { useEffect, useState } from "react";
import BlogPost from "./BlogPost";

export default function PostList() {
    const [posts, setPosts] = useState<BlogPostType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const res = await axios(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/Posts`
                );
                console.log("Posts:", res);
                return res.data as BlogPostType[];
            } catch (error) {
                console.error("Error occured fetching posts", error);
                return null;
            }
        };

        getPosts()
            .then((res) => {
                if (res !== null) {
                    console.log("Posts:", res);
                    setPosts(res);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <ul className="list-none w-lg flex flex-row gap-6 justify-center">
            {posts.length === 0 && !loading && (
                <h1 className="text-2xl text-red-500">No posts found</h1>
            )}
            {posts.map((p) => (
                <BlogPost post={p} key={p.id} />
            ))}
        </ul>
    );
}
