import { BlogPostType } from "@/types/BlogPostType";
import ImageWithFallback from "./ImageWithFallback";
import Link from "next/link";
import { POST_FALLBACK_IMAGE } from "@/lib/constants";

export default function PostListItem({ post }: { post: BlogPostType }) {
    return (
        <Link
            href={`/posts/${post.id}`}
            className="w-64 h-72 rounded-xl grid place-items-center grid-rows-3 text-center shadow-sm  cursor-pointer bg-surface hover:bg-surface- transition hover:scale-105"
        >
            <span className="relative w-full h-full p-0 m-0 row-span-2">
                <ImageWithFallback
                    imageUrl={post.coverImageUrl}
                    fallbackUrl={POST_FALLBACK_IMAGE}
                    className="rounded-t-xl"
                    fill
                    alt={post.title}
                />
            </span>
            <div className="m-0 self-start pt-2 w-full h-full">
                <p className="text-xl">{post.title}</p>
                <p className="text-sm">{post.description}</p>
                <p>By: {post.author.userName}</p>
            </div>
        </Link>
    );
}

//i love my girlfrend
//eyrun is the best and super smart
