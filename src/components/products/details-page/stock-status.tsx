"use client";

import React from "react";
import { Product } from "@/components/products/card";

interface StockStatusProps {
  product: Product;
}

const StockStatus: React.FC<StockStatusProps> = ({ product }) => {
  return (
    <>
      {product.stock > 0 ? (
        <p className="text-green-600 font-medium">
          ✓ In Stock - {product.stock} available
        </p>
      ) : (
        <p className="text-red-600 font-medium">✗ Out of Stock</p>
      )}
    </>
  );
};

export default StockStatus; 