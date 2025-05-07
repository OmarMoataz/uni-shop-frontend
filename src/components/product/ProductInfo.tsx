
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const ProductInfo = () => {
  return (
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
  );
};

export default ProductInfo;
