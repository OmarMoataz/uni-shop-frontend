
import React from 'react';
import { Button } from "@/components/ui/button";
import { categories } from '@/enums';

interface CategoryListProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryList = ({ searchTerm, setSearchTerm }: CategoryListProps) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {categories.map((category) => (
          <Button 
            key={category} 
            variant={category === searchTerm ? "default" : "outline"}
            onClick={() => category === "All" ? setSearchTerm('') : setSearchTerm(category)}
            className="whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
