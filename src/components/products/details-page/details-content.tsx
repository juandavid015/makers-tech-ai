"use client";

import React from "react";
import { Product } from "@/components/products/card";
import ProductHeader from "./header";
import ProductPrice from "./price";
import ProductFeatures from "./features";
import SizeSelector from "./size-selector";
import QuantitySelector from "./quantity-selector";
import StockStatus from "./stock-status";
import ProductActions from "./actions";

interface ProductDetailsContentProps {
  product: Product;
  selectedSize: string;
  quantity: number;
  onSizeChange: (size: string) => void;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const ProductDetailsContent: React.FC<ProductDetailsContentProps> = ({
  product,
  selectedSize,
  quantity,
  onSizeChange,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
}) => {
  return (
    <div className="space-y-8">
      <ProductHeader product={product} />
      
      <div className="flex items-center space-x-4">
        <ProductPrice product={product} />
      </div>
      
      {/* Description */}
      <p className="text-gray-700 leading-relaxed text-lg">
        {product.description}
      </p>

      <ProductFeatures product={product} />

      {/* Size Selection (for laptops) */}
      {product.category === "laptops" && (
        <SizeSelector
          selectedSize={selectedSize}
          onSizeChange={onSizeChange}
        />
      )}

      <QuantitySelector
        quantity={quantity}
        onQuantityChange={onQuantityChange}
        maxStock={product.stock}
      />

      <StockStatus product={product} />

      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <ProductActions
          product={product}
          quantity={quantity}
          selectedSize={selectedSize}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      </div>
    </div>
  );
};

export default ProductDetailsContent; 