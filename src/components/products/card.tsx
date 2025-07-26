"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShoppingCart } from "lucide-react";

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

// Sub-component: Product Image with badges
interface ProductImageProps {
  product: Product;
  showStock: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({ product, showStock }) => {
  const { name, imageUrl, price, originalPrice, stock } = product;

  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="relative aspect-square bg-gray-100 overflow-hidden">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          console.log(
            `Image failed to load for ${name}, falling back to placeholder`
          );
          e.currentTarget.src = "/images/products/placeholder.svg";
        }}
      />

      {/* Discount Badge */}
      {hasDiscount && (
        <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
          -{discountPercentage}%
        </Badge>
      )}

      {/* Stock Badge */}
      {showStock && (
        <Badge
          className={cn(
            "absolute top-2 right-2 text-xs",
            stock > 5
              ? "bg-green-500 text-white"
              : stock > 0
              ? "bg-yellow-500 text-white"
              : "bg-red-500 text-white"
          )}
        >
          {stock > 5
            ? "In Stock"
            : stock > 0
            ? `${stock} left`
            : "Out of Stock"}
        </Badge>
      )}
    </div>
  );
};

// Sub-component: Product Header (Category and Name)
interface ProductHeaderProps {
  product: Product;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ product }) => {
  return (
    <div className="space-y-2">
      {/* Category */}
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs capitalize">
          {product.category}
        </Badge>
        <ExternalLink className="w-3 h-3 text-gray-400" />
      </div>

      {/* Product Name */}
      <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {product.name}
      </h3>
    </div>
  );
};

// Sub-component: Product Features
interface ProductFeaturesProps {
  features: string[];
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features }) => {
  if (features.length === 0) return null;

  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-gray-700">Key Features:</p>
      <ul className="text-xs text-gray-600 space-y-1">
        {features.slice(0, 3).map((feature, index) => (
          <li key={index} className="flex items-start gap-1">
            <span className="text-green-500 mt-0.5">•</span>
            <span className="line-clamp-1">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Sub-component: Product Price
interface ProductPriceProps {
  price: number;
  originalPrice?: number;
}

const ProductPrice: React.FC<ProductPriceProps> = ({
  price,
  originalPrice,
}) => {
  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-bold text-gray-900">
        ${price.toLocaleString()}
      </span>
      {hasDiscount && (
        <span className="text-sm text-gray-500 line-through">
          ${originalPrice?.toLocaleString()}
        </span>
      )}
    </div>
  );
};

// Sub-component: Product Actions
interface ProductActionsProps {
  product: Product;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Buy clicked for:", product.name);
  };

  return (
    <div className="flex gap-2 pt-2">
      <Button
        size="sm"
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        onClick={handleBuyClick}
        disabled={product.stock === 0}
      >
        <ShoppingCart className="w-4 h-4 mr-1" />
        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
};

// Sub-component: Product Tags
interface ProductTagsProps {
  tags: string[];
}

const ProductTags: React.FC<ProductTagsProps> = ({ tags }) => {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1 pt-2">
      {tags.slice(0, 3).map((tag, index) => (
        <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5">
          {tag}
        </Badge>
      ))}
    </div>
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
  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      // Default behavior - navigate to product page
      window.open(product.refUrl, "_blank");
    }
  };

  return (
    <div
      className={cn(
        "group relative bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-gray-300 cursor-pointer",
        compact ? "max-w-[280px]" : "max-w-[320px]",
        className
      )}
      onClick={handleCardClick}
    >
      <ProductImage product={product} showStock={showStock} />

      <div className="p-4 space-y-3">
        <ProductHeader product={product} />

        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        {showFeatures && <ProductFeatures features={product.features} />}

        <ProductPrice
          price={product.price}
          originalPrice={product.originalPrice}
        />

        <ProductActions product={product} />

        <ProductTags tags={product.tags} />
      </div>
    </div>
  );
};

export default ProductCard;
