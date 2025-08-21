"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageWithFallbackProps {
    imageUrl: string;
    fallbackUrl: string;
    alt: string;
}

export default function ImageWithFallback({
    imageUrl,
    fallbackUrl,
    alt,
    ...props
}: ImageWithFallbackProps &
    Omit<React.ComponentProps<typeof Image>, "src" | "alt">) {
    const [loading, setLoading] = useState(true);
    const [currentSrc, setCurrentSrc] = useState(imageUrl || fallbackUrl);
    const [hasError, setHasError] = useState(false);

    // Validate url on mount
    useEffect(() => {
        setLoading(true);
        try {
            new URL(imageUrl);
            setCurrentSrc(imageUrl);
            setHasError(false);
        } catch (_) {
            setCurrentSrc(fallbackUrl);
            setHasError(true);
        } finally {
            setLoading(false);
        }
    }, [imageUrl, fallbackUrl]);

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
        <Image src={currentSrc} alt={alt} onError={handleError} {...props} />
    );
}
