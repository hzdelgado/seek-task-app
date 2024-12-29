import React from "react";
import { useLoader } from "@/application/context/LoaderContext";

const OverlayLoader: React.FC = () => {
    const { loading } = useLoader(); 
    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div data-testid="loader" className="animate-spin rounded-full border-t-4 border-b-4 border-white w-16 h-16"></div>
        </div>
    );
};

export default OverlayLoader;