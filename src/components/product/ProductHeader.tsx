
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ICategory } from '@/interfaces/ICategory';

interface ProductHeaderProps {
  name: string;
  category?: ICategory;
  rating: number;
}

const ProductHeader = ({ name, category, rating }: ProductHeaderProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{name}</h1>
      <div className="flex items-center gap-2 mt-2">
        {category && <Badge variant="outline">{category.name}</Badge>}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(rating) 
                  ? "text-yellow-400" 
                  : i < rating 
                    ? "text-yellow-400" 
                    : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-1 text-xs text-muted-foreground">
            {rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
