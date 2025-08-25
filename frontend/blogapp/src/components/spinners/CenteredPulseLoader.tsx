import { PulseLoader } from "react-spinners";

interface CenteredPulseLoaderProps {
    color?: string;
    loading?: boolean;
}

export default function CenteredPulseLoader({
    color,
    loading,
}: CenteredPulseLoaderProps) {
    return (
        <PulseLoader
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2"
            color={color || "teal"}
            loading={loading}
        />
    );
}
