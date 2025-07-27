import React from "react";
import { Product } from "@/components/products/card";
import ProductCard from "@/components/products/card";

interface ProductsSectionProps {
  products: Product[];
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ products }) => {
  const categories = [
    { name: "All Products", active: true },
    { name: "Laptops", active: false },
    { name: "Accessories", active: false },
    { name: "Gaming", active: false },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header with Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 lg:mb-0">
            OUR COLLECTION
          </h2>

          {/* Category Filters */}
          <div className="flex items-center space-x-8">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`text-sm font-medium transition-colors duration-200 ${
                  category.active
                    ? "text-gray-900 border-b-2 border-gray-900 pb-1"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {category.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showStock={true}
              showFeatures={false}
              compact={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection; 