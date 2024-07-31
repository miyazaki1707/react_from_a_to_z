import { useState } from "react";

export const useFetching = (callback) => {
    const [isLoading, setIssLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async () => {
        try {
            setIssLoading(true);
            await callback();
        } catch (e) {
            setError(e.message);
        } finally {
            setIssLoading(false);
        }
    }

    return [fetching, isLoading, error];
}