"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  maxStock: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onQuantityChange,
  maxStock,
}) => {
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Quantity
      </h3>
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
          className="border-gray-200 text-gray-700 hover:border-gray-300"
        >
          -
        </Button>
        <span className="text-xl font-semibold w-12 text-center">
          {quantity}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onQuantityChange(quantity + 1)}
          disabled={quantity >= maxStock}
          className="border-gray-200 text-gray-700 hover:border-gray-300"
        >
          +
        </Button>
      </div>
    </>
  );
};

export default QuantitySelector; 