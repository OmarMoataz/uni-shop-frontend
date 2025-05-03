
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  searchTerm: string;
  onApiKeyChange: (apiKey: string) => void;
  apiKey: string;
}

const RecommendationPanel = ({ 
  recommendation, 
  products, 
  isLoading, 
  searchTerm, 
  onApiKeyChange, 
  apiKey 
}: RecommendationPanelProps) => {
  const [showApiInput, setShowApiInput] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  
  const handleSaveApiKey = () => {
    onApiKeyChange(tempApiKey);
    setShowApiInput(false);
  };

  // If no API key and search term is valid, show API input option
  if (!apiKey && searchTerm && searchTerm.length >= 3) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Get AI Product Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          {!showApiInput ? (
            <div className="text-center">
              <p className="mb-4 text-muted-foreground">
                Connect Claude AI to get personalized product recommendations based on your search.
              </p>
              <Button onClick={() => setShowApiInput(true)}>
                Connect Claude API
              </Button>
            </div>
          ) : (
            <div className="p-4 border rounded-md bg-background">
              <h3 className="text-sm font-medium mb-2">Enter Anthropic Claude API Key</h3>
              <div className="flex gap-2">
                <Input 
                  type="password" 
                  value={tempApiKey} 
                  onChange={(e) => setTempApiKey(e.target.value)} 
                  placeholder="sk-ant-api03-..."
                  className="flex-1"
                />
                <Button onClick={handleSaveApiKey}>Save</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Your API key is stored locally in your browser and never sent to our servers.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

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
