
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface HeroSectionProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent) => void;
}

const HeroSection = ({ searchTerm, setSearchTerm, handleSearch }: HeroSectionProps) => {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-secondary/20 py-16">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Find Your Perfect Product</h2>
        <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
          <Input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
