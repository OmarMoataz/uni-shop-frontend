
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductImageCarouselProps {
  mainImage: string;
  productName: string;
}

const ProductImageCarousel = ({ mainImage, productName }: ProductImageCarouselProps) => {
  return (
    <Carousel className="w-full max-w-lg mx-auto">
      <CarouselContent>
        <CarouselItem>
          <div className="bg-secondary/20 rounded-lg p-6 h-80 flex items-center justify-center">
            <img 
              src={mainImage || "/placeholder.svg"} 
              alt={productName}
              className="max-h-full w-auto mx-auto object-contain" 
            />
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="bg-secondary/20 rounded-lg p-6 h-80 flex items-center justify-center">
            <img 
              src="/placeholder.svg" 
              alt="Another view"
              className="max-h-full w-auto mx-auto object-contain" 
            />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};

export default ProductImageCarousel;
