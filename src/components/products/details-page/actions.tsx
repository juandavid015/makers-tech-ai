"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/components/products/card";

interface ProductActionsProps {
  product: Product;
  quantity: number;
  selectedSize: string;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  onAddToCart,
  onBuyNow,
}) => {
  return (
    <>
      <Button
        variant="primary"
        size="lg"
        onClick={onAddToCart}
        disabled={product.stock === 0}
        className="flex-1 bg-black text-white hover:bg-gray-800 font-semibold text-lg py-4"
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Add to Cart
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={onBuyNow}
        disabled={product.stock === 0}
        className="flex-1 border-black text-black hover:bg-black hover:text-white font-semibold text-lg py-4"
      >
        Buy Now
      </Button>
    </>
  );
};

export default ProductActions; 