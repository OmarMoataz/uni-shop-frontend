
import React, { useState, useEffect } from 'react';
import { useSearch } from '@/hooks/useSearch';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoryList from '@/components/home/CategoryList';
import ProductList from '@/components/home/ProductList';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const [filteredProducts, isError] = useSearch(debouncedSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled via the filter
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <HeroSection 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />

      <div className="container mx-auto py-8 px-4 md:px-6">
        <CategoryList 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <ProductList 
          isError={isError}
          filteredProducts={filteredProducts}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Index;
