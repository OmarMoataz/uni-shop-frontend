
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useCart } from '@/contexts/CartContext';
import { IProduct } from '@/interfaces/IProduct';
import { useToast } from '@/hooks/useToast';

interface CartCounterProps {
  product: IProduct;
  quantity: number;
}

const CartCounter = ({ product, quantity }: CartCounterProps) => {
  const { addToCart, updateQuantity } = useCart();
  const { toast } = useToast();

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} quantity increased.`,
    });
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    updateQuantity(product.id, quantity - 1);
    if (quantity === 1) {
      toast({
        title: "Removed from cart",
        description: `${product.name} removed from cart.`,
      });
    } else {
      toast({
        title: "Updated cart",
        description: `${product.name} quantity decreased.`,
      });
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button 
        size="sm" 
        variant="outline" 
        className="h-8 w-8 p-0 rounded-full"
        onClick={handleDecrement}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="text-sm font-medium min-w-[20px] text-center">{quantity}</span>
      <Button 
        size="sm" 
        variant="outline" 
        className="h-8 w-8 p-0 rounded-full"
        onClick={handleIncrement}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
};

export default CartCounter;
