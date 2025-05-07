
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

const ProductActions = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button className="flex-1" size="lg">
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
