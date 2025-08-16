"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageWithFallbackProps {
    imageUrl: string;
    fallbackUrl: string;
    className?: string;
}

export default function ImageWithFallback({
    imageUrl,
    fallbackUrl,
    className,
}: ImageWithFallbackProps) {
    const [loading, setLoading] = useState(true);
    const [currentSrc, setCurrentSrc] = useState(imageUrl || fallbackUrl);
    const [hasError, setHasError] = useState(false);

    // Validate url on mount
    useEffect(()=> {
        let src;
        try {
            src = new URL(imageUrl);
            setCurrentSrc(imageUrl);

        } catch (_) {
            setCurrentSrc(fallbackUrl);
        } finally {
            setLoading(false);
        }
    }, [])


    const handleError = () => {
        if (!hasError && currentSrc !== fallbackUrl) {
            setHasError(true);
            setCurrentSrc(fallbackUrl);
        }
    };

    // Don't render if both imageUrl and fallbackUrl are empty or if loading
    if ((!imageUrl && !fallbackUrl) || loading) {
        return null;
    }

    return (
        <Image
            src={currentSrc}
            alt="cover image for blog post"
            fill
            style={{ objectFit: "cover" }}
            onError={handleError}
            className={className}
        />
    );
}
