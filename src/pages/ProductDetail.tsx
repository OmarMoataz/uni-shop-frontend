
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";
import { IProduct } from "@/interfaces/IProduct";
import { apiUrls } from '@/lib/apiURLs';
import { CartProvider } from '@/contexts/CartContext';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductImageCarousel from "@/components/product/ProductImageCarousel";
import ProductHeader from "@/components/product/ProductHeader";
import ProductPrice from "@/components/product/ProductPrice";
import ProductDescription from "@/components/product/ProductDescription";
import ProductActions from "@/components/product/ProductActions";
import ProductInfo from "@/components/product/ProductInfo";
import ProductDetailSkeleton from "@/components/product/ProductDetailSkeleton";
import ProductNotFound from "@/components/product/ProductNotFound";

const ProductDetailPage = () => {
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
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return <ProductNotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Product Detail */}
      <div className="container mx-auto py-8 px-4 md:px-6">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images */}
          <div>
            <ProductImageCarousel 
              mainImage={product.image} 
              productName={product.name} 
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <ProductHeader 
              name={product.name} 
              category={product.category} 
              rating={product.rating} 
            />
            
            <ProductPrice 
              price={product.price} 
              discount={product.discount} 
            />
            
            <ProductDescription description={product.description} />
            
            <ProductActions product={product} />
            
            <ProductInfo />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const ProductDetail = () => {
  return (
    <CartProvider>
      <ProductDetailPage />
    </CartProvider>
  );
};

export default ProductDetail;
