"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/components/products/card";

interface ProductImageGalleryProps {
  product: Product;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ product }) => {
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) / product.originalPrice!) *
          100
      )
    : 0;

  return (
    <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = "/images/products/placeholder.svg";
        }}
      />

      {/* Badges */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {hasDiscount && (
          <Badge className="bg-black text-white text-xs font-medium px-3 py-1 rounded-full">
            {discountPercentage}% OFF
          </Badge>
        )}
        {product.tags.includes("new") && (
          <Badge className="bg-gray-800 text-white text-xs font-medium px-3 py-1 rounded-full">
            NEW
          </Badge>
        )}
      </div>

      {/* Stock Badge */}
      {product.stock <= 5 && product.stock > 0 && (
        <Badge className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">
          {product.stock} LEFT
        </Badge>
      )}

      {/* Out of Stock Overlay */}
      {product.stock === 0 && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <Badge className="bg-red-600 text-white text-lg font-medium px-6 py-3 rounded-full">
            OUT OF STOCK
          </Badge>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery; 