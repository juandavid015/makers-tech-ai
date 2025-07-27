"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  imageUrl: string;
  refUrl: string;
  features: string[];
  tags: string[];
  specs?: Record<string, string>;
}

interface ProductCardProps {
  product: Product;
  className?: string;
  onProductClick?: (product: Product) => void;
  showStock?: boolean;
  showFeatures?: boolean;
  compact?: boolean;
}

// Sub-component: Product Image
interface ProductImageProps {
  product: Product;
  showStock: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({ product, showStock }) => {
  const { name, imageUrl, price, originalPrice, stock } = product;

  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-lg mb-4">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          console.log(
            `Image failed to load for ${name}, falling back to placeholder`
          );
          e.currentTarget.src = "/images/products/placeholder.svg";
        }}
      />

      {/* Badges - Top Left */}
      <div className="absolute top-3 left-3 flex flex-col gap-2">
        {hasDiscount && (
          <Badge className="bg-yellow-500 text-white text-xs font-medium px-2 py-1 rounded">
            Sale
          </Badge>
        )}
        {product.tags.includes("new") && (
          <Badge className="bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded">
            New
          </Badge>
        )}
      </div>

      {/* Stock Badge - Top Right */}
      {showStock && stock <= 5 && stock > 0 && (
        <Badge className="absolute top-3 right-3 bg-purple-500 text-white text-xs font-medium px-2 py-1 rounded">
          {stock} left
        </Badge>
      )}

      {/* Out of Stock Overlay */}
      {showStock && stock === 0 && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <Badge className="bg-black text-white text-sm font-medium px-3 py-1 rounded">
            Out of Stock
          </Badge>
        </div>
      )}
    </div>
  );
};

// Sub-component: Product Info
interface ProductInfoProps {
  product: Product;
  compact?: boolean;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  compact = false,
}) => {
  const { name, price, originalPrice } = product;
  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className="space-y-3 px-4">
      {/* Product Name */}
      <h3
        className={cn(
          "font-semibold text-gray-900 line-clamp-2 group-hover:text-black transition-colors",
          compact ? "text-sm" : "text-base"
        )}
      >
        {name}
      </h3>

      {/* Price */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "font-semibold text-gray-900",
            compact ? "text-base" : "text-lg"
          )}
        >
          From ${price.toLocaleString()}
        </span>
        {hasDiscount && (
          <span className="text-sm text-gray-400 line-through">
            ${originalPrice?.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
};

// Sub-component: Product Actions
interface ProductActionsProps {
  product: Product;
  compact?: boolean;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  compact = false,
}) => {
  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Buy clicked for:", product.name);
  };

  return (
    <Button
      size={compact ? "sm" : "default"}
      variant="primary"
      className={cn(
        "w-full font-medium mt-4",
        compact ? "text-sm py-2" : "py-3"
      )}
      onClick={handleBuyClick}
      disabled={product.stock === 0}
    >
      <ShoppingCart className={cn("mr-2", compact ? "w-4 h-4" : "w-5 h-5")} />
      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
    </Button>
  );
};

// Main ProductCard component
const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className,
  onProductClick,
  showStock = true,
  showFeatures = false,
  compact = false,
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      // Navigate to product details page
      router.push(`/products/${product.id}`);
    }
  };

  return (
    <div
      className={cn(
        "group relative bg-white border-black overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300 cursor-pointer",
        compact ? "max-w-[280px]" : "max-w-[320px]",
        className
      )}
      onClick={handleCardClick}
    >
      <ProductImage product={product} showStock={showStock} />
      <ProductInfo product={product} compact={compact} />
      <ProductActions product={product} compact={compact} />
    </div>
  );
};

export default ProductCard;
