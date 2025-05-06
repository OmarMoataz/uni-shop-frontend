import { apiUrls } from "@/lib/apiURLs";
import { useCallback, useEffect, useState } from "react";

export const useSearch = (query: string) => {
    const [filteredProducts, setFilteredProducts] = useState([]);

    const fetchProducts = useCallback(async () => {
        try {
            let response: Response;

            if (query) {
                response = await fetch(apiUrls.searchProducts(query));
            } else {
                response = await fetch(apiUrls.getAllProducts());
            }

            const data = await response.json();
            setFilteredProducts(data);
        } catch (error) {
            console.error("Failed to fetch recommendations:", error);
        }
    }, [query]);

    useEffect(() => {
        fetchProducts();
    }, [query, fetchProducts]);


    return filteredProducts;
};