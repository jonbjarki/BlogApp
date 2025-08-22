import { POST_FALLBACK_IMAGE } from "@/lib/constants";
import Image from "next/image";

export default function FallbackImage() {
    return (
        <Image
            src={POST_FALLBACK_IMAGE}
            alt="Fallback Image"
            layout="fill"
            objectFit="cover"
        />
    );
}
