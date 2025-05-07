import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { IProduct } from "@/interfaces/IProduct";
import { apiUrls } from '@/lib/apiURLs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const response = await fetch(apiUrls.getProduct(productId || ''));
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4 md:px-6 flex justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-4xl">
          <div className="h-8 bg-secondary/50 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-80 bg-secondary/30 rounded"></div>
            <div className="space-y-4">
              <div className="h-6 bg-secondary/50 rounded w-3/4"></div>
              <div className="h-4 bg-secondary/50 rounded w-1/3"></div>
              <div className="h-4 bg-secondary/50 rounded w-1/2"></div>
              <div className="h-24 bg-secondary/30 rounded"></div>
              <div className="h-10 bg-secondary/40 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-16 px-4 md:px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-8">Sorry, we couldn't find the product you're looking for.</p>
        <Link to="/">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - keeping the same header from Index */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto py-4 px-4 md:px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">UniShop</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Product Detail */}
      <div className="container mx-auto py-8 px-4 md:px-6">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images */}
          <div>
            <Carousel className="w-full max-w-lg mx-auto">
              <CarouselContent>
                <CarouselItem>
                  <div className="bg-secondary/20 rounded-lg p-6 h-80 flex items-center justify-center">
                    <img 
                      src={product.image || "/placeholder.svg"} 
                      alt={product.name}
                      className="max-h-full w-auto mx-auto object-contain" 
                    />
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="bg-secondary/20 rounded-lg p-6 h-80 flex items-center justify-center">
                    <img 
                      src="/placeholder.svg" 
                      alt="Another view"
                      className="max-h-full w-auto mx-auto object-contain" 
                    />
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{product.category?.name}</Badge>
                <div className="flex items-center gap-0.5">
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
              </div>
            </div>

            <div>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">
                  ${(product.price - product.discount).toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <Badge className="bg-destructive">
                      -{(product.discount / product.price * 100).toFixed(0)}%
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1" size="lg">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1" size="lg">
                Buy Now
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Shipping</p>
                    <p className="text-sm text-muted-foreground">Free delivery</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Returns</p>
                    <p className="text-sm text-muted-foreground">30 days money back</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Warranty</p>
                    <p className="text-sm text-muted-foreground">1 year coverage</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Availability</p>
                    <p className="text-sm text-muted-foreground">In stock</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer - keep the same footer from Index */}
      <footer className="bg-secondary/20 mt-16">
        <div className="container mx-auto py-8 px-4 md:px-6">
          {/* Keep the existing footer content from Index */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">UniShop</h3>
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
                <input placeholder="Email" className="rounded-r-none" />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            &copy; 2025 UniShop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
