"use client";

import React from "react";
import { Check } from "lucide-react";
import { Product } from "@/components/products/card";

interface ProductFeaturesProps {
  product: Product;
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ product }) => {
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Key Features
      </h3>
      <ul className="space-y-3">
        {product.features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700">
            <Check className="w-4 h-4 text-gray-900 mr-3 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductFeatures; 