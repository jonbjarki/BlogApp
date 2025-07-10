import { BlogPostType } from "@/types/BlogPostType";
import Image from "next/image";

export default function BlogPost(post: BlogPostType) {
    return (
        <div className="w-7/12 h-64 grid place-items-center grid-rows-2 grid-rows-[] text-center">
            <span className="relative w-full h-full p-0 m-0">
                <Image src={post.coverImageUrl} alt="cover image for blog post" layout="fill" objectFit="cover" />
            </span>
            <div className="p-0 m-0">
                <p className="text-xl">{post.title}</p>
                <p className="text-sm">{post.description}</p>
            </div>
        </div>
    )
}




//i love my girlfrend
//eyrun is the best and super smart