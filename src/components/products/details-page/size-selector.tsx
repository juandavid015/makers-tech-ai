"use client";

import React from "react";

interface SizeSelectorProps {
  selectedSize: string;
  onSizeChange: (size: string) => void;
  sizes?: string[];
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  selectedSize,
  onSizeChange,
  sizes = ["13.3", "14", "15.6", "17"],
}) => {
  return (
    <>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Screen Size
      </h3>
      <div className="flex space-x-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
              selectedSize === size
                ? "border-black bg-black text-white"
                : "border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            {size}&quot;
          </button>
        ))}
      </div>
    </>
  );
};

export default SizeSelector; 