
export const apiUrls = {
    searchProducts: (query: string) => `${import.meta.env.VITE_API_BASE_URL}/products/search?query=${query}`,
    getAllProducts: () => `${import.meta.env.VITE_API_BASE_URL}/products`,
    getProduct: (id: string) => `${import.meta.env.VITE_API_BASE_URL}/products/${id}`,
    getAllCategories: () => `${import.meta.env.VITE_API_BASE_URL}/categories`,
}
