"use client";
import FallbackImage from "./FallbackImage";
import Image from "next/image";
import { useEffect, useState } from "react";
import CenteredSpinner from "./spinners/CenteredSpinner";
import CenteredBarLoader from "./spinners/CenteredPulseLoader";

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
    const [loading, setLoading] = useState(true);

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
        <>
            {loading && <CenteredBarLoader />}
            <Image
                src={currentSrc}
                onLoad={() => {
                    setLoading(false);
                }}
                alt={alt}
                onError={handleError}
                {...props}
            />
        </>
    );
}
