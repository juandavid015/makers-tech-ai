"use client";

import React from "react";
import { Product } from "@/components/products/card";

interface ProductHeaderProps {
  product: Product;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ product }) => {
  return (
    <>
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
        {product.category}
      </p>
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
        {product.name}
      </h1>
    </>
  );
};

export default ProductHeader; 