import { BlogPostType } from "@/types/BlogPostType";
import axios from "axios";
import BlogPost from "./PostListItem";
import { ClipLoader } from "react-spinners";
import CenteredSpinner from "./CenteredSpinner";
import { FETCH_POSTS_URL } from "@/lib/constants";

async function fetchPosts() {
    const res = await fetch(FETCH_POSTS_URL, {
        next: { tags: ["posts"], revalidate: 3600 },
    });

    return res.json() as Promise<BlogPostType[]>;
}

export default async function PostList() {
    const posts = await fetchPosts();

    return (
        <>
            {/* <CenteredSpinner loading={loading} /> */}

            <ul className="list-none w-full mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.length === 0 && (
                    <h1 className="text-2xl text-red-500">No posts found</h1>
                )}
                {posts.map((p) => (
                    <li key={p.id}>
                        <BlogPost post={p} />
                    </li>
                ))}
            </ul>
        </>
    );
}
