
import React from "react";

const ProductDetailSkeleton = () => {
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
};

export default ProductDetailSkeleton;
