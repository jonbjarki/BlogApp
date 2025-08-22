"use client";
import FallbackImage from "./FallbackImage";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ImageWithFallbackProps {
    imageUrl: string;
    alt: string;
}

const getInitialSrc = (imageUrl: string) => {
    try {
        new URL(imageUrl);
        return imageUrl;
    } catch (_) {
        return null;
    }
};

export default function ImageWithFallback({
    imageUrl,
    alt,
    ...props
}: ImageWithFallbackProps &
    Omit<React.ComponentProps<typeof Image>, "src" | "alt">) {
    const [currentSrc, setCurrentSrc] = useState<string | null>(() =>
        getInitialSrc(imageUrl)
    );
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError && currentSrc !== null) {
            setHasError(true);
            setCurrentSrc(null);
        }
    };

    if (currentSrc == null) {
        return <FallbackImage />;
    }

    return (
        <Image src={currentSrc} alt={alt} onError={handleError} {...props} />
    );
}
