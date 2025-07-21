'use client'

import { BlogPostType } from "@/types/BlogPostType";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function BlogPost({post}: {post: BlogPostType}) {
    const DEFAULT_IMAGE_SRC = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_SRC ?? "https://via.placeholder.com/400x300/cccccc/666666?text=No+Image";
    const [imageSrc, setImageSrc] = useState<string>(DEFAULT_IMAGE_SRC);
    const [imageError, setImageError] = useState<boolean>(false);
    
    // Function to validate if a string is a valid URL
    const isValidUrl = (urlString: string): boolean => {
        if (!urlString || urlString.trim() === '') return false;
        try {
            new URL(urlString);
            return true;
        } catch {
            return false;
        }
    };

    // Set initial image source with validation
    useEffect(() => {
        if (isValidUrl(post.coverImageUrl)) {
            setImageSrc(post.coverImageUrl);
        } else {
            setImageSrc(DEFAULT_IMAGE_SRC);
            setImageError(true);
        }
    }, [post.coverImageUrl, DEFAULT_IMAGE_SRC]);
    
    const handleImageError = () => {
        if (!imageError && imageSrc !== DEFAULT_IMAGE_SRC) {
            setImageError(true);
            setImageSrc(DEFAULT_IMAGE_SRC);
        }
    };

    return (
        <div className="w-7/12 h-64 grid place-items-center grid-rows-2 grid-rows-[] text-center">
            <span className="relative w-full h-full p-0 m-0">
                <Image 
                src={imageSrc} 
                onError={handleImageError}
                alt="cover image for blog post" 
                fill
                style={{ objectFit: 'cover' }} />
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