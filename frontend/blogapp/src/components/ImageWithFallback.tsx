"use client";
import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps {
    imageUrl: string;
    fallbackUrl: string;
}

export default function ImageWithFallback({
    imageUrl,
    fallbackUrl,
}: ImageWithFallbackProps) {
    const [currentSrc, setCurrentSrc] = useState(imageUrl || fallbackUrl);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError && currentSrc !== fallbackUrl) {
            setHasError(true);
            setCurrentSrc(fallbackUrl);
        }
    };

    // Don't render if both imageUrl and fallbackUrl are empty
    if (!imageUrl && !fallbackUrl) {
        return null;
    }

    return (
        <Image
            src={currentSrc}
            alt="cover image for blog post"
            fill
            style={{ objectFit: "cover" }}
            onError={handleError}
        />
    );
}
