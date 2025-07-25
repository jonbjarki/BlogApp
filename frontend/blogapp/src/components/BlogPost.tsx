import { BlogPostType } from "@/types/BlogPostType";
import ImageWithFallback from "./ImageWithFallback";

export default function BlogPost({ post }: { post: BlogPostType }) {
    return (
        <div className="w-56 h-64 grid place-items-center grid-rows-3 grid-rows-[] text-center border-1 border-black">
            <span className="relative w-full h-full p-0 m-0 row-span-2">
                <ImageWithFallback
                    imageUrl={post.coverImageUrl}
                    fallbackUrl="https://cdn.pixabay.com/photo/2015/09/23/22/56/dog-954520_1280.jpg"
                />
            </span>
            <div className="p-0 m-0 self-start pt-2">
                <p className="text-xl">{post.title}</p>
                <p className="text-sm">{post.description}</p>
                <p>By: {post.author.name}</p>
            </div>
        </div>
    );
}

//i love my girlfrend
//eyrun is the best and super smart
