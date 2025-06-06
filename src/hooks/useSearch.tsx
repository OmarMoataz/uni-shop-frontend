import { IProduct } from "@/interfaces/IProduct";
import { apiUrls } from "@/lib/apiURLs";
import { useCallback, useEffect, useState } from "react";

export const useSearch = (query: string, category: string): [IProduct[], boolean, boolean] => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const fetchProducts = useCallback(async () => {
        try {
            setError(false);
            setLoading(false);
            let response: Response;

            setLoading(true);

            if (query) {
                response = await fetch(apiUrls.searchProducts(query, category));
            } else {
                response = await fetch(apiUrls.getAllProducts(category));
            }

            const data = await response.json();
            setLoading(false);
            setFilteredProducts(data);
        } catch (error) {
            setError(true);
            console.error("Failed to fetch recommendations:", error);
        }
    }, [query, category]);

    useEffect(() => {
        fetchProducts();
    }, [query, category, fetchProducts]);


    return [filteredProducts, isError, isLoading];
};