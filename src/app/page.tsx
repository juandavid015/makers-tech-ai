"use client";

import React from "react";
import { getAllProducts } from "@/server/actions/products";
import ProductCard from "@/components/products/card";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ErrorBoundary from "@/components/ui/error-boundary";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";

// Hero Section Component
const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Background Gradient Orb Effect - Much Larger */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]">
        <div className="relative w-full h-full">
          {/* Main Large Translucent Orb */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 via-purple-200/30 to-white/50 rounded-full blur-3xl"></div>

          {/* Inner Glow Layer */}
          <div className="absolute inset-8 bg-gradient-to-br from-blue-100/50 via-purple-100/40 to-white/60 rounded-full blur-2xl"></div>

          {/* Highlight Effect */}
          <div className="absolute top-16 left-16 w-64 h-64 bg-white/70 rounded-full blur-xl"></div>

          {/* Secondary Glow */}
          <div className="absolute bottom-16 right-16 w-48 h-48 bg-purple-200/50 rounded-full blur-xl"></div>

          {/* Additional Inner Layers */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/30 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Additional Large Floating Orbs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-200/25 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-5 w-80 h-80 bg-blue-100/35 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/4 right-5 w-72 h-72 bg-purple-100/30 rounded-full blur-2xl"></div>

      {/* Extra Large Background Orb */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-200/20 to-purple-200/15 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-l from-purple-200/25 to-blue-200/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-light text-gray-900 leading-tight">
                Elevate Your
                <span className="block font-medium">Digital World</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Discover cutting-edge technology that transforms the way you
                work, play, and create. Where innovation meets elegance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <Button
                size="lg"
                variant="primary"
                className="px-8 py-4 text-lg font-medium"
              >
                Explore Collection
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg font-medium"
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/26545222/pexels-photo-26545222.jpeg"
                alt="Premium Technology"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-600/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Products Section Component (formerly Featured Products)
const ProductsSection: React.FC = () => {
  const allProducts = getAllProducts();

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
          {allProducts.map((product) => (
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

// CTA Section Component
const CTASection: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Gradient Orb Effects */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
        <div className="relative w-full h-full">
          {/* Main Translucent Orb */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-purple-200/20 to-white/40 rounded-full blur-3xl"></div>

          {/* Inner Glow */}
          <div className="absolute inset-8 bg-gradient-to-br from-blue-100/40 via-purple-100/30 to-white/50 rounded-full blur-2xl"></div>

          {/* Highlight Effect */}
          <div className="absolute top-12 left-12 w-48 h-48 bg-white/60 rounded-full blur-xl"></div>

          {/* Secondary Glow */}
          <div className="absolute bottom-12 right-12 w-32 h-32 bg-purple-200/40 rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Additional Floating Orbs */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-blue-200/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-200/15 rounded-full blur-2xl"></div>
      <div className="absolute top-1/3 left-5 w-40 h-40 bg-blue-100/25 rounded-full blur-xl"></div>
      <div className="absolute bottom-1/3 right-5 w-56 h-56 bg-purple-100/20 rounded-full blur-xl"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            READY TO TRANSFORM YOUR TECH SETUP?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust us for their
            technology needs. Start your journey today with our premium
            selection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="primary"
              className="px-8 py-4 text-lg font-medium"
            >
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg font-medium"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen font-sans">
      <HeroSection />
      <ProductsSection />
      <CTASection />
    </main>
  );
}
