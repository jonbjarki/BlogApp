import { BlogPostType } from "@/types/BlogPostType";
import ImageWithFallback from "./ImageWithFallback";

export default function BlogPost({ post }: { post: BlogPostType }) {
    return (
        <div className="w-56 h-64 rounded-xl grid place-items-center grid-rows-3 text-center shadow-sm  cursor-pointer bg-surface hover:bg-surface- transition hover:scale-105">
            <span className="relative w-full h-full p-0 m-0 row-span-2">
                <ImageWithFallback
                    imageUrl={post.coverImageUrl}
                    fallbackUrl="https://cdn.pixabay.com/photo/2015/09/23/22/56/dog-954520_1280.jpg"
                    className="rounded-t-xl"
                />
            </span>
            <div className="p-0 m-0 self-start pt-2 w-full h-full">
                <p className="text-xl">{post.title}</p>
                <p className="text-sm">{post.description}</p>
                <p>By: {post.author.name}</p>
            </div>
        </div>
    );
}

//i love my girlfrend
//eyrun is the best and super smart
