import { ClipLoader } from "react-spinners";

export default function CenteredSpinner({ loading }: { loading?: boolean }) {
    return (
        <ClipLoader
            loading={loading}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2"
        />
    );
}
