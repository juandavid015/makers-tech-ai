import { notFound } from "next/navigation";
import { getProductById } from "@/server/actions/products";
import {
  ProductImageGallery,
} from "@/components/products/details-page";
import ProductDetailsClient from "./product-details-client";



const ProductDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white container mx-auto px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-16">
      <ProductImageGallery product={product} />
      <ProductDetailsClient product={product} />
    </div>
  );
};

export default ProductDetailsPage;
