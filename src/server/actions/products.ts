import productsData from "@/data/products.json";
import { Product } from "@/components/products/card";

export interface CompanyInfo {
  name: string;
  description: string;
  founded: string;
  headquarters: string;
  website: string;
  contact: {
    email: string;
    phone: string;
    hours: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Software {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  period: string;
  features: string[];
  refUrl: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  period: string;
  features: string[];
  refUrl: string;
}

export interface ProductsDatabase {
  company: CompanyInfo;
  categories: Category[];
  products: Product[];
  software: Software[];
  services: Service[];
}

// Load the products data
const db: ProductsDatabase = productsData as unknown as ProductsDatabase;

// Product search and filtering functions
export const getCompanyInfo = async (): Promise<CompanyInfo> => {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 50));
  return db.company;
};

export const getCategories = async (): Promise<Category[]> => {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 80));
  return db.categories;
};

export const getAllProducts = async (): Promise<Product[]> => {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 150));
  return db.products;
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 120));
  return db.products.filter(product => product.category === categoryId);
};

export const getProductById = async (productId: string): Promise<Product | null> => {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const product = db.products.find(product => product.id === productId);
  return product || null;
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const lowercaseQuery = query.toLowerCase();
  return db.products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    product.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
  );
};

export const getProductsByPriceRange = async (minPrice: number, maxPrice: number): Promise<Product[]> => {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return db.products.filter(product => 
    product.price >= minPrice && product.price <= maxPrice
  );
};

export const getProductsInStock = async (): Promise<Product[]> => {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 80));
  return db.products.filter(product => product.stock > 0);
};

export const getProductsWithDiscount = async (): Promise<Product[]> => {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 90));
  return db.products.filter(product => product.originalPrice && product.originalPrice > product.price);
};

export const getProductsByTag = async (tag: string): Promise<Product[]> => {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 110));
  return db.products.filter(product => 
    product.tags.some(productTag => productTag.toLowerCase().includes(tag.toLowerCase()))
  );
};

// Software and services functions
export const getAllSoftware = async (): Promise<Software[]> => {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 70));
  return db.software;
};

export const getAllServices = async (): Promise<Service[]> => {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 70));
  return db.services;
};

export const getSoftwareById = async (softwareId: string): Promise<Software | null> => {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 100));
  const software = db.software.find(software => software.id === softwareId);
  return software || null;
};

export const getServiceById = async (serviceId: string): Promise<Service | null> => {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 100));
  const service = db.services.find(service => service.id === serviceId);
  return service || null;
};

// Inventory management functions
export const getInventorySummary = async () => {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 120));
  
  const totalProducts = db.products.length;
  const inStockProducts = db.products.filter(p => p.stock > 0).length;
  const lowStockProducts = db.products.filter(p => p.stock > 0 && p.stock <= 3).length;
  const outOfStockProducts = db.products.filter(p => p.stock === 0).length;
  
  const totalValue = db.products.reduce((sum, product) => sum + (product.price * product.stock), 0);
  
  return {
    totalProducts,
    inStockProducts,
    lowStockProducts,
    outOfStockProducts,
    totalValue: Math.round(totalValue)
  };
};

export const getLowStockProducts = async (): Promise<Product[]> => {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 90));
  return db.products.filter(product => product.stock > 0 && product.stock <= 3);
};

// Recommendation functions
export const getRecommendedProducts = async (category?: string, maxProducts: number = 4): Promise<Product[]> => {
  // Simulate database delay
  await new Promise(resolve => setTimeout(resolve, 150));
  
  let filteredProducts = category 
    ? await getProductsByCategory(category)
    : await getAllProducts();
  
  // Filter to only in-stock products
  filteredProducts = filteredProducts.filter(p => p.stock > 0);
  
  // Sort by popularity (you could add a popularity field to the JSON)
  // For now, we'll prioritize products with discounts and higher stock
  filteredProducts.sort((a, b) => {
    const aScore = (a.originalPrice ? 10 : 0) + Math.min(a.stock, 10);
    const bScore = (b.originalPrice ? 10 : 0) + Math.min(b.stock, 10);
    return bScore - aScore;
  });
  
  return filteredProducts.slice(0, maxProducts);
};

// Export the database for direct access if needed
export { db as productsDatabase }; 