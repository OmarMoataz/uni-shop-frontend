import { IProduct } from "@/interfaces/IProduct";
import { apiUrls } from "@/lib/apiURLs";
import { useCallback, useEffect, useState } from "react";

export const useSearch = (query: string): [IProduct[], boolean] => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isError, setIsError] = useState(false);

    const fetchProducts = useCallback(async () => {
        try {
            setIsError(false);
            let response: Response;

            if (query) {
                response = await fetch(apiUrls.searchProducts(query));
            } else {
                response = await fetch(apiUrls.getAllProducts());
            }

            const data = await response.json();
            setFilteredProducts(data);
        } catch (error) {
            setIsError(true);
            console.error("Failed to fetch recommendations:", error);
        }
    }, [query]);

    useEffect(() => {
        fetchProducts();
    }, [query, fetchProducts]);


    return [filteredProducts, isError];
};