
import React, { useState, useEffect } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoryList from '@/components/home/CategoryList';
import ProductList from '@/components/home/ProductList';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const [category, setCategory] = useState('All');

  const handleCategoryChange = (value) => {
    setCategory(value);
  }

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const [filteredProducts, isError, isLoading] = useSearch(debouncedSearch, category === "All" ? "" : category);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled via the filter
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Header />
        
        <HeroSection 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />

        <div className="container mx-auto py-8 px-4 md:px-6">
          <CategoryList 
            categoryTerm={category}
            onSetCategory={handleCategoryChange}
          />

          <ProductList 
            isError={isError}
            isLoading={isLoading}
            filteredProducts={filteredProducts}
          />
        </div>

        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;
