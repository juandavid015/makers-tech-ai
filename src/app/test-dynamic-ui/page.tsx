"use client";

import React from "react";
import ProductCarousel from "@/components/products/carousel";
import { getAllProducts, getProductsByCategory, searchProducts } from "@/server/actions/products";
import { Product } from "@/components/products/card";

// Sub-component: Page Header
const PageHeader: React.FC = () => {
  return (
    <h1 className="text-3xl font-bold text-center mb-8">
      Dynamic UI Test Page
    </h1>
  );
};

// Sub-component: Test Section
interface TestSectionProps {
  title: string;
  products: Product[];
  carouselTitle: string;
  carouselSubtitle: string;
  onProductClick: (product: Product) => void;
  showStock?: boolean;
  showFeatures?: boolean;
  compact?: boolean;
}

const TestSection: React.FC<TestSectionProps> = ({
  title,
  products,
  carouselTitle,
  carouselSubtitle,
  onProductClick,
  showStock = true,
  showFeatures = false,
  compact = false,
}) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <ProductCarousel
        products={products}
        title={carouselTitle}
        subtitle={carouselSubtitle}
        onProductClick={onProductClick}
        showStock={showStock}
        showFeatures={showFeatures}
        compact={compact}
      />
    </section>
  );
};

// Sub-component: Debug Information
interface DebugInfoProps {
  allProducts: Product[];
  laptops: Product[];
  accessories: Product[];
  gamingProducts: Product[];
}

const DebugInfo: React.FC<DebugInfoProps> = ({
  allProducts,
  laptops,
  accessories,
  gamingProducts,
}) => {
  return (
    <div className="mt-12 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Debug Information</h3>
      <div className="text-sm space-y-2">
        <p><strong>Total Products:</strong> {allProducts.length}</p>
        <p><strong>Laptops:</strong> {laptops.length}</p>
        <p><strong>Accessories:</strong> {accessories.length}</p>
        <p><strong>Gaming Products:</strong> {gamingProducts.length}</p>
      </div>
    </div>
  );
};

// Main TestDynamicUIPage component
export default function TestDynamicUIPage() {
  const allProducts = getAllProducts();
  const laptops = getProductsByCategory("laptops");
  const accessories = getProductsByCategory("accessories");
  const gamingProducts = searchProducts("gaming");

  const handleProductClick = (product: Product) => {
    console.log("Product clicked:", product);
    window.open(product.refUrl, "_blank");
  };

  const testSections = [
    {
      title: "All Products",
      products: allProducts,
      carouselTitle: "All Available Products",
      carouselSubtitle: "Browse our complete inventory",
      showStock: true,
      showFeatures: true,
    },
    {
      title: "Laptops",
      products: laptops,
      carouselTitle: "Premium Laptops",
      carouselSubtitle: "Our finest selection of portable computers",
      showStock: true,
      showFeatures: false,
    },
    {
      title: "Accessories",
      products: accessories,
      carouselTitle: "Tech Accessories",
      carouselSubtitle: "Enhance your setup with premium accessories",
      showStock: true,
      showFeatures: true,
    },
    {
      title: 'Search Results for "Gaming"',
      products: gamingProducts,
      carouselTitle: "Gaming Products",
      carouselSubtitle: "Products matching your search criteria",
      showStock: true,
      showFeatures: true,
    },
    {
      title: "Compact Display",
      products: laptops.slice(0, 3),
      carouselTitle: "Compact Laptops",
      carouselSubtitle: "Space-efficient display",
      showStock: false,
      showFeatures: false,
      compact: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <PageHeader />

      <div className="space-y-8">
        {testSections.map((section, index) => (
          <TestSection
            key={index}
            title={section.title}
            products={section.products}
            carouselTitle={section.carouselTitle}
            carouselSubtitle={section.carouselSubtitle}
            onProductClick={handleProductClick}
            showStock={section.showStock}
            showFeatures={section.showFeatures}
            compact={section.compact}
          />
        ))}
      </div>

      <DebugInfo
        allProducts={allProducts}
        laptops={laptops}
        accessories={accessories}
        gamingProducts={gamingProducts}
      />
    </div>
  );
} 