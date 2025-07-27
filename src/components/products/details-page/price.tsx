"use client";

import React from "react";
import { Product } from "@/components/products/card";

interface ProductPriceProps {
  product: Product;
}

const ProductPrice: React.FC<ProductPriceProps> = ({ product }) => {
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  return (
    <>
      <span className="text-3xl font-bold text-gray-900">
        ${product.price.toLocaleString()}
      </span>
      {hasDiscount && (
        <span className="text-xl text-gray-400 line-through">
          ${product.originalPrice?.toLocaleString()}
        </span>
      )}
    </>
  );
};

export default ProductPrice; 