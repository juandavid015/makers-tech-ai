"use client";

import React, { useState } from "react";
import { Product } from "@/components/products/card";
import { ProductDetailsContent } from "@/components/products/details-page";

interface ProductDetailsClientProps {
  product: Product;
}

const ProductDetailsClient: React.FC<ProductDetailsClientProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.category === "laptops" ? "15.6" : ""
  );
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log("Adding to cart:", {
      product: product.name,
      quantity,
      size: selectedSize || "default",
      price: product.price,
    });

    // Simulate API call
    setTimeout(() => {
      alert(`${quantity}x ${product.name} added to cart!`);
    }, 500);
  };

  const handleBuyNow = () => {
    console.log("Buying now:", {
      product: product.name,
      quantity,
      size: selectedSize || "default",
      price: product.price,
    });

    // Simulate checkout process
    setTimeout(() => {
      alert(`Redirecting to checkout for ${product.name}...`);
    }, 500);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };

  return (
    <ProductDetailsContent
      product={product}
      selectedSize={selectedSize}
      quantity={quantity}
      onSizeChange={handleSizeChange}
      onQuantityChange={handleQuantityChange}
      onAddToCart={handleAddToCart}
      onBuyNow={handleBuyNow}
    />
  );
};

export default ProductDetailsClient; 