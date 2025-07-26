"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShoppingCart } from "lucide-react";
import { Product } from "@/components/products/card";

interface ProductDetailsProps {
  product: Product & {
    specs?: Record<string, string>;
  };
  className?: string;
  onProductClick?: (product: Product) => void;
}

// Sub-component: Product Image with badges
interface ProductImageProps {
  product: Product;
}

const ProductImage: React.FC<ProductImageProps> = ({ product }) => {
  const { name, imageUrl, price, originalPrice, stock } = product;
  
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = "/images/products/placeholder.svg";
        }}
      />
      
      {/* Discount Badge */}
      {hasDiscount && (
        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
          -{discountPercentage}%
        </Badge>
      )}
      
      {/* Stock Badge */}
      <Badge 
        className={cn(
          "absolute top-2 right-2",
          stock > 5 ? "bg-green-500 text-white" : 
          stock > 0 ? "bg-yellow-500 text-white" : 
          "bg-red-500 text-white"
        )}
      >
        {stock > 5 ? "In Stock" : stock > 0 ? `${stock} left` : "Out of Stock"}
      </Badge>
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
        <Badge variant="outline" className="capitalize">
          {product.category}
        </Badge>
        <ExternalLink className="w-4 h-4 text-gray-400" />
      </div>

      {/* Product Name */}
      <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
    </div>
  );
};

// Sub-component: Product Price
interface ProductPriceProps {
  price: number;
  originalPrice?: number;
}

const ProductPrice: React.FC<ProductPriceProps> = ({ price, originalPrice }) => {
  const hasDiscount = originalPrice && originalPrice > price;

  return (
    <div className="flex items-center gap-2">
      <span className="text-3xl font-bold text-gray-900">
        ${price.toLocaleString()}
      </span>
      {hasDiscount && (
        <span className="text-lg text-gray-500 line-through">
          ${originalPrice?.toLocaleString()}
        </span>
      )}
    </div>
  );
};

// Sub-component: Product Actions
interface ProductActionsProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product, onProductClick }) => {
  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Buy clicked for:", product.name);
  };

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick(product);
    } else {
      window.open(product.refUrl, "_blank");
    }
  };

  return (
    <div className="flex gap-3">
      <Button 
        onClick={handleBuyClick}
        className="flex-1 bg-blue-600 hover:bg-blue-700"
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Add to Cart
      </Button>
      <Button 
        variant="outline" 
        onClick={handleCardClick}
        className="flex-1"
      >
        View Details
      </Button>
    </div>
  );
};

// Sub-component: Product Tags
interface ProductTagsProps {
  tags: string[];
}

const ProductTags: React.FC<ProductTagsProps> = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <Badge key={index} variant="secondary" className="text-xs">
          {tag}
        </Badge>
      ))}
    </div>
  );
};

// Sub-component: Product Features
interface ProductFeaturesProps {
  features: string[];
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features }) => {
  if (!features || features.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-green-500 mt-1">•</span>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Sub-component: Product Specifications
interface ProductSpecificationsProps {
  specs?: Record<string, string>;
}

const ProductSpecifications: React.FC<ProductSpecificationsProps> = ({ specs }) => {
  if (!specs || Object.keys(specs).length === 0) return null;

  const formatSpecKey = (key: string) => {
    return key.replace(/([A-Z])/g, ' $1').trim();
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="flex justify-between py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700 capitalize">
              {formatSpecKey(key)}
            </span>
            <span className="text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main ProductDetails component
const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  className,
  onProductClick,
}) => {
  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 p-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductImage product={product} />

        <div className="space-y-4">
          <ProductHeader product={product} />
          
          <p className="text-gray-600">{product.description}</p>
          
          <ProductPrice price={product.price} originalPrice={product.originalPrice} />
          
          <ProductActions product={product} onProductClick={onProductClick} />
          
          <ProductTags tags={product.tags} />
        </div>
      </div>

      <ProductFeatures features={product.features} />
      <ProductSpecifications specs={product.specs} />
    </div>
  );
};

export default ProductDetails; 