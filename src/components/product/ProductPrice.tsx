
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface ProductPriceProps {
  price: number;
  discount: number;
}

const ProductPrice = ({ price, discount }: ProductPriceProps) => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold">
          ${(price - discount).toFixed(2)}
        </span>
        {discount > 0 && (
          <>
            <span className="text-xl text-muted-foreground line-through">
              ${price.toFixed(2)}
            </span>
            <Badge className="bg-destructive">
              -{(discount / price * 100).toFixed(0)}%
            </Badge>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPrice;
