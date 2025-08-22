import { BlogPostType } from "@/types/BlogPostType";
import ImageWithFallback from "./ImageWithFallback";
import Link from "next/link";
import ParagraphWithMaxLength from "./ParagraphWithMaxLength";

export default function PostListItem({ post }: { post: BlogPostType }) {
    return (
        <Link href={`/posts/${post.id}`} className="group">
            <div className="w-64 h-80 rounded-xl grid place-items-center grid-rows-5 text-center shadow-sm cursor-pointer bg-surface transition group-hover:scale-105">
                <span className="relative w-full h-full p-0 m-0 row-span-3">
                    <ImageWithFallback
                        imageUrl={post.coverImageUrl}
                        className="rounded-t-xl"
                        fill
                        alt={post.title}
                    />
                </span>
                <div className="m-0 pt-2 px-4 w-full h-full overflow-hidden row-span-2 flex flex-col items-center text-left font-sans">
                    <ParagraphWithMaxLength
                        text={post.title}
                        maxLength={40}
                        className="text-md font-medium w-fit"
                    />
                    <ParagraphWithMaxLength
                        text={post.description}
                        maxLength={60}
                        className="text-sm mt-2 w-fit"
                    />
                </div>
            </div>
        </Link>
    );
}

//i love my girlfrend
//eyrun is the best and super smart
