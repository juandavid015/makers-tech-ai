import React from "react";
import { getAllProducts } from "@/server/actions/products";
import { HeroSection, ProductsSection, CTASection } from "@/components/home";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main className="flex flex-col w-full min-h-screen font-sans">
      <HeroSection />
      <ProductsSection products={products} />
      <CTASection />
    </main>
  );
}
