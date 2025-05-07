
import React from 'react';

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Description</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default ProductDescription;
