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
const db: ProductsDatabase = productsData as ProductsDatabase;

// Product search and filtering functions
export const getCompanyInfo = (): CompanyInfo => db.company;

export const getCategories = (): Category[] => db.categories;

export const getAllProducts = (): Product[] => db.products;

export const getProductsByCategory = (categoryId: string): Product[] => {
  return db.products.filter(product => product.category === categoryId);
};

export const getProductById = (productId: string): Product | undefined => {
  return db.products.find(product => product.id === productId);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return db.products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    product.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
  );
};

export const getProductsByPriceRange = (minPrice: number, maxPrice: number): Product[] => {
  return db.products.filter(product => 
    product.price >= minPrice && product.price <= maxPrice
  );
};

export const getProductsInStock = (): Product[] => {
  return db.products.filter(product => product.stock > 0);
};

export const getProductsWithDiscount = (): Product[] => {
  return db.products.filter(product => product.originalPrice && product.originalPrice > product.price);
};

export const getProductsByTag = (tag: string): Product[] => {
  return db.products.filter(product => 
    product.tags.some(productTag => productTag.toLowerCase().includes(tag.toLowerCase()))
  );
};

// Software and services functions
export const getAllSoftware = (): Software[] => db.software;

export const getAllServices = (): Service[] => db.services;

export const getSoftwareById = (softwareId: string): Software | undefined => {
  return db.software.find(software => software.id === softwareId);
};

export const getServiceById = (serviceId: string): Service | undefined => {
  return db.services.find(service => service.id === serviceId);
};

// Inventory management functions
export const getInventorySummary = () => {
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

export const getLowStockProducts = (): Product[] => {
  return db.products.filter(product => product.stock > 0 && product.stock <= 3);
};

// Recommendation functions
export const getRecommendedProducts = (category?: string, maxProducts: number = 4): Product[] => {
  let filteredProducts = category 
    ? getProductsByCategory(category)
    : getAllProducts();
  
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