"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard, { Product } from "@/components/products/card";

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  className?: string;
  onProductClick?: (product: Product) => void;
  showStock?: boolean;
  showFeatures?: boolean;
  compact?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
}

// Sub-component: Carousel Header
interface CarouselHeaderProps {
  title?: string;
  subtitle?: string;
}

const CarouselHeader: React.FC<CarouselHeaderProps> = ({ title, subtitle }) => {
  if (!title && !subtitle) return null;

  return (
    <div className="mb-6 text-center">
      {title && (
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      )}
      {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
    </div>
  );
};

// Sub-component: Empty State
interface EmptyStateProps {
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ className }) => {
  return (
    <div className={cn("text-center py-8", className)}>
      <p className="text-gray-500">No products available</p>
    </div>
  );
};

// Sub-component: Carousel Navigation
interface CarouselNavigationProps {
  productsCount: number;
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  productsCount,
}) => {
  if (productsCount <= 1) return null;

  return (
    <>
      <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 shadow-lg border border-gray-200" />
      <CarouselNext className="right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 shadow-lg border border-gray-200" />
    </>
  );
};

// Sub-component: Scroll Indicator
interface ScrollIndicatorProps {
  productsCount: number;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ productsCount }) => {
  if (productsCount <= 1) return null;

  return (
    <div className="flex justify-center mt-4">
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-500">
          ← Swipe or click arrows to browse {productsCount} products →
        </span>
        <div className="flex space-x-1">
          {Array.from({ length: productsCount }).map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-gray-300" />
          ))}
        </div>
      </div>
    </div>
  );
};

// Sub-component: Product Carousel Items
interface ProductCarouselItemsProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  showStock: boolean;
  showFeatures: boolean;
  compact: boolean;
}

const ProductCarouselItems: React.FC<ProductCarouselItemsProps> = ({
  products,
  onProductClick,
  showStock,
  showFeatures,
  compact,
}) => {
  return (
    <CarouselContent className="-ml-2 md:-ml-4">
      {products.map((product) => (
        <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full">
          <div className="relative">
            <ProductCard
              product={product}
              onProductClick={onProductClick}
              showStock={showStock}
              showFeatures={showFeatures}
              compact={compact}
            />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  );
};

// Sub-component: Carousel Container
interface CarouselContainerProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  showStock: boolean;
  showFeatures: boolean;
  compact: boolean;
  autoPlay: boolean;
  loop: boolean;
}

const CarouselContainer: React.FC<CarouselContainerProps> = ({
  products,
  onProductClick,
  showStock,
  showFeatures,
  compact,
  autoPlay,
  loop,
}) => {
  const carouselOptions = {
    align: "center" as const,
    loop,
    slidesToScroll: 1,
    containScroll: "trimSnaps" as const,
    duration: 20,
    ...(autoPlay && {
      loop: true,
      skipSnaps: false,
    }),
  };

  return (
    <div className="relative group overflow-hidden rounded-lg">
      <Carousel opts={carouselOptions} className="w-full">
        <ProductCarouselItems
          products={products}
          onProductClick={onProductClick}
          showStock={showStock}
          showFeatures={showFeatures}
          compact={compact}
        />
        <CarouselNavigation productsCount={products.length} />
      </Carousel>
      <ScrollIndicator productsCount={products.length} />
    </div>
  );
};

// Main ProductCarousel component
const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  title,
  subtitle,
  className,
  onProductClick,
  showStock = true,
  showFeatures = false,
  compact = false,
  autoPlay = false,
  loop = true,
}) => {
  if (!products || products.length === 0) {
    return <EmptyState className={className} />;
  }

  return (
    <div className={cn("w-full", className)}>
      <CarouselHeader title={title} subtitle={subtitle} />
      <CarouselContainer
        products={products}
        onProductClick={onProductClick}
        showStock={showStock}
        showFeatures={showFeatures}
        compact={compact}
        autoPlay={autoPlay}
        loop={loop}
      />
    </div>
  );
};

export default ProductCarousel;
