
import React from 'react';
import { Button } from "@/components/ui/button";
import { useCategories } from '@/hooks/useCategories';

interface CategoryListProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryList = ({ searchTerm, setSearchTerm }: CategoryListProps) => {
  const [categories, isError, isLoading] = useCategories();

  if (isLoading) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="flex overflow-x-auto gap-4 pb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <p className="text-red-500">Failed to load categories</p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {categories.map((category) => (
          <Button 
            key={category.id} 
            variant={category.name === searchTerm || (category.name === "All" && searchTerm === '') ? "default" : "outline"}
            onClick={() => category.name === "All" ? setSearchTerm('') : setSearchTerm(category.name)}
            className="whitespace-nowrap"
          >
            {category.name}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
