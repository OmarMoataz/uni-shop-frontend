
import { ICategory } from "@/interfaces/ICategory";
import { apiUrls } from "@/lib/apiURLs";
import { useCallback, useEffect, useState } from "react";

export const useCategories = (): [ICategory[], boolean, boolean] => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const fetchCategories = useCallback(async () => {
        try {
            setError(false);
            setLoading(true);

            const response = await fetch(apiUrls.getAllCategories());
            const data = await response.json();
            
            // Add "All" category at the beginning
            const allCategories = [{ id: "all", name: "All" }, ...data];
            setCategories(allCategories);
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
            console.error("Failed to fetch categories:", error);
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return [categories, isError, isLoading];
};
