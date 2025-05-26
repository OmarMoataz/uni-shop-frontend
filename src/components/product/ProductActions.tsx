
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from '@/contexts/CartContext';
import { IProduct } from '@/interfaces/IProduct';
import { useToast } from '@/hooks/useToast';

interface ProductActionsProps {
  product: IProduct;
}

const ProductActions = ({ product }: ProductActionsProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button className="flex-1" size="lg" onClick={handleAddToCart}>
        <ShoppingCart className="h-4 w-4 mr-2" />
        Add to Cart
      </Button>
      <Button variant="outline" className="flex-1" size="lg">
        Buy Now
      </Button>
    </div>
  );
};

export default ProductActions;
