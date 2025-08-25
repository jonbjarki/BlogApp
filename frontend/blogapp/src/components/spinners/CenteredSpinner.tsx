"use client";
import { ClipLoader } from "react-spinners";

interface CenteredSpinnerProps {
    color?: string;
    loading?: boolean;
}

export default function CenteredSpinner({
    color,
    loading,
}: CenteredSpinnerProps) {
    return (
        <ClipLoader
            loading={loading}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2"
            color={color || "teal"}
        />
    );
}
