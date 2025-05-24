
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { IProduct } from '@/interfaces/IProduct';
import { Link } from 'react-router-dom';

interface ProductListProps {
  isError: boolean;
  isLoading: boolean;
  filteredProducts: IProduct[];
}

const ProductList = ({ isError, isLoading, filteredProducts }: ProductListProps) => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      {isError && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-muted-foreground">Error fetching products</h3>
          <p className="mt-2 text-muted-foreground">Please try again later</p>
        </div>
      )}
      {isLoading && (
        <div> 
          Loading...
        </div>
      )}
      {!isLoading && !isError && filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-muted-foreground">No products found</h3>
          <p className="mt-2 text-muted-foreground">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
              <Card className="overflow-hidden h-full">
                <div className="relative h-48 bg-secondary/20">
                  <img 
                    src={product.image || "/placeholder.svg"} 
                    alt={product.name}
                    className="w-full h-full object-contain p-4" 
                  />
                  {product.discount > 0 && (
                    <Badge className="absolute top-2 right-2 bg-destructive">
                      -{(product.discount / product.price * 100).toFixed(0)}%
                    </Badge>
                  )}
                </div>
                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{product.name}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.category?.name}</p>
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
                <CardFooter className="p-4 pt-0 flex justify-between items-center mt-auto">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">
                        ${(product.price - product.discount).toFixed(2)} 
                      </span>
                      {product.discount > 0 && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button size="sm" className="rounded-full" onClick={(e) => {
                    e.preventDefault(); // Prevent navigation when clicking the button
                    // Add to cart logic here
                  }}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
