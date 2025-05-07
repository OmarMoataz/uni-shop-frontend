
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ProductNotFound = () => {
  return (
    <div className="container mx-auto py-16 px-4 md:px-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
      <p className="mb-8">Sorry, we couldn't find the product you're looking for.</p>
      <Link to="/">
        <Button>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </Link>
    </div>
  );
};

export default ProductNotFound;
