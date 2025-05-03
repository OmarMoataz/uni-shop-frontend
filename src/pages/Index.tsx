import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getProductRecommendations } from '@/utils/claudeAPI';
import RecommendationPanel from '@/components/RecommendationPanel';

// Sample product data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 149.99,
    category: "Electronics",
    image: "/placeholder.svg",
    rating: 4.5,
    discount: 15,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 299.99,
    category: "Electronics",
    image: "/placeholder.svg",
    rating: 4.8,
    discount: 0,
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 89.99,
    category: "Sports",
    image: "/placeholder.svg",
    rating: 4.2,
    discount: 10,
  },
  {
    id: 4,
    name: "Cotton T-Shirt",
    price: 24.99,
    category: "Clothing",
    image: "/placeholder.svg",
    rating: 4.0,
    discount: 5,
  },
  {
    id: 5,
    name: "Smartphone",
    price: 899.99,
    category: "Electronics",
    image: "/placeholder.svg",
    rating: 4.7,
    discount: 0,
  },
  {
    id: 6,
    name: "Laptop",
    price: 1299.99,
    category: "Electronics",
    image: "/placeholder.svg",
    rating: 4.9,
    discount: 20,
  },
  {
    id: 7,
    name: "Coffee Maker",
    price: 79.99,
    category: "Home",
    image: "/placeholder.svg",
    rating: 4.3,
    discount: 0,
  },
  {
    id: 8,
    name: "Backpack",
    price: 49.99,
    category: "Accessories",
    image: "/placeholder.svg",
    rating: 4.4,
    discount: 0,
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);
  const [recommendation, setRecommendation] = useState('');
  const [suggestedProductIds, setSuggestedProductIds] = useState<number[]>([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get suggested products based on recommendation
  const suggestedProducts = products.filter(product => 
    suggestedProductIds.includes(product.id)
  );

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Get recommendations when search term changes (if API key is provided)
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!apiKey || !debouncedSearch || debouncedSearch.length < 3) {
        return;
      }
      
      setIsLoadingRecommendations(true);
      try {
        const result = await getProductRecommendations(debouncedSearch, apiKey);
        setRecommendation(result.recommendation);
        setSuggestedProductIds(result.suggestedProducts);
      } catch (error) {
        console.error("Failed to get recommendations:", error);
      } finally {
        setIsLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
  }, [debouncedSearch, apiKey]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled via the filter
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 md:px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">ShopNow</h1>
            <div className="flex items-center space-x-4">
              {!apiKey && (
                <Button 
                  variant="outline" 
                  onClick={() => setShowApiInput(prev => !prev)}
                >
                  Connect Claude
                </Button>
              )}
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {showApiInput && (
            <div className="mt-4 p-4 border rounded-md bg-background">
              <h3 className="text-sm font-medium mb-2">Enter Anthropic Claude API Key</h3>
              <div className="flex gap-2">
                <Input 
                  type="password" 
                  value={apiKey} 
                  onChange={(e) => setApiKey(e.target.value)} 
                  placeholder="sk-ant-api03-..."
                  className="flex-1"
                />
                <Button onClick={() => setShowApiInput(false)}>Save</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Your API key is stored locally in your browser and never sent to our servers.
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Hero section with search */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/20 py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Find Your Perfect Product</h2>
          <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
            <Input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          </form>
        </div>
      </section>

      {/* Main content */}
      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* AI Recommendations */}
        {apiKey && searchTerm.length >= 3 && (
          <RecommendationPanel 
            recommendation={recommendation} 
            products={suggestedProducts}
            isLoading={isLoadingRecommendations}
          />
        )}

        {/* Categories */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <div className="flex overflow-x-auto gap-4 pb-4">
            {["All", "Electronics", "Clothing", "Sports", "Home", "Accessories"].map((category) => (
              <Button 
                key={category} 
                variant={category === "All" ? "default" : "outline"}
                onClick={() => category === "All" ? setSearchTerm('') : setSearchTerm(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Products */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Products</h2>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-muted-foreground">No products found</h3>
              <p className="mt-2 text-muted-foreground">Try a different search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="relative h-48 bg-secondary/20">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain p-4" 
                    />
                    {product.discount > 0 && (
                      <Badge className="absolute top-2 right-2 bg-destructive">
                        -{product.discount}%
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="p-4 pb-0">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{product.name}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) 
                              ? "text-yellow-400" 
                              : i < product.rating 
                                ? "text-yellow-400" 
                                : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-xs text-muted-foreground">
                        {product.rating}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <div>
                      {product.discount > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">
                            ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                    <Button size="sm" className="rounded-full">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-secondary/20 mt-16">
        <div className="container mx-auto py-8 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">ShopNow</h3>
              <p className="text-muted-foreground text-sm">Your one-stop shop for all your needs.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Categories</h3>
              <ul className="space-y-2 text-sm">
                <li>Electronics</li>
                <li>Clothing</li>
                <li>Sports</li>
                <li>Home</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
              <ul className="space-y-2 text-sm">
                <li>Contact Us</li>
                <li>FAQs</li>
                <li>Shipping</li>
                <li>Returns</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
              <p className="text-muted-foreground text-sm mb-3">Subscribe to get updates on new products and offers.</p>
              <div className="flex">
                <Input placeholder="Email" className="rounded-r-none" />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            &copy; 2025 ShopNow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
