export const apiUrls = {
  searchProducts: (query: string, category: string) =>
    `${
      import.meta.env.VITE_API_BASE_URL
    }/products/search?query=${query}&category=${category}`,
  getAllProducts: (category) =>
    `${import.meta.env.VITE_API_BASE_URL}/products?category=${category}`,
  getProduct: (id: string) =>
    `${import.meta.env.VITE_API_BASE_URL}/products/${id}`,
  getAllCategories: () => `${import.meta.env.VITE_API_BASE_URL}/categories`,
};
