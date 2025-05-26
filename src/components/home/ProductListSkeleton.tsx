
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const ProductListSkeleton = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="overflow-hidden h-full">
            <div className="relative h-48 bg-secondary/20">
              <Skeleton className="w-full h-full" />
            </div>
            <CardHeader className="p-4 pb-0">
              <div className="flex justify-between items-start">
                <Skeleton className="h-5 w-3/4" />
              </div>
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent className="p-4 pt-2">
              <div className="flex items-center gap-0.5 mt-1">
                <Skeleton className="h-4 w-20" />
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center mt-auto">
              <div>
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-8 w-16 rounded-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProductListSkeleton;
