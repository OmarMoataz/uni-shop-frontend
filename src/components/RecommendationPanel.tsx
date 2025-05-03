
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  discount: number;
}

interface RecommendationPanelProps {
  recommendation: string;
  products: Product[];
  isLoading: boolean;
}

const RecommendationPanel = ({ recommendation, products, isLoading }: RecommendationPanelProps) => {
  if (isLoading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Getting AI Recommendations...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-4 bg-secondary rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-secondary rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-secondary rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!recommendation || products.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8 border-primary/20">
      <CardHeader className="bg-primary/5 border-b border-primary/10">
        <CardTitle className="text-xl flex items-center gap-2">
          AI Recommendations
          <Badge variant="outline" className="ml-2 bg-primary/10">Claude</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-muted-foreground mb-4">{recommendation}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product.id} className="border rounded-md p-2 flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-secondary/20 rounded-md mb-2 flex items-center justify-center">
                <img src={product.image} alt={product.name} className="h-12 w-12 object-contain" />
              </div>
              <p className="text-sm font-medium truncate w-full">{product.name}</p>
              <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationPanel;
