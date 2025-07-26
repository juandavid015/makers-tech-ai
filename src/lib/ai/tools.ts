import { tool as createTool } from 'ai';
import { z } from 'zod';
import { 
  getAllProducts, 
  getProductsByCategory, 
  searchProducts, 
  getProductById,
  getRecommendedProducts,
  getProductsByPriceRange,
  getProductsInStock,
  getProductsWithDiscount
} from '@/server/actions/products';

// Product Carousel Tool
export const productCarouselTool = createTool({
  description: 'Display a carousel of products based on category, search, or specific product IDs',
  parameters: z.object({
    title: z.string().optional().describe('Title for the product carousel'),
    subtitle: z.string().optional().describe('Subtitle for the product carousel'),
    category: z.string().optional().describe('Product category to display (laptops, accessories, etc.)'),
    search: z.string().optional().describe('Search term to filter products'),
    productIds: z.array(z.string()).optional().describe('Specific product IDs to display'),
    maxProducts: z.number().optional().describe('Maximum number of products to show'),
    showStock: z.boolean().optional().describe('Whether to show stock information'),
    showFeatures: z.boolean().optional().describe('Whether to show product features'),
    priceRange: z.object({
      min: z.number().optional(),
      max: z.number().optional()
    }).optional().describe('Price range filter'),
    inStockOnly: z.boolean().optional().describe('Show only products in stock'),
    withDiscount: z.boolean().optional().describe('Show only products with discounts')
  }),
  execute: async function ({ 
    title, 
    subtitle, 
    category, 
    search, 
    productIds, 
    maxProducts = 6,
    showStock = true,
    showFeatures = false,
    priceRange,
    inStockOnly = false,
    withDiscount = false
  }) {
    let products = [];

    // Determine which products to fetch based on parameters
    if (productIds && productIds.length > 0) {
      // Specific product IDs provided
      products = productIds
        .map(id => getProductById(id))
        .filter(Boolean);
    } else if (category) {
      // Category-based products
      products = getProductsByCategory(category);
    } else if (search) {
      // Search-based products
      products = searchProducts(search);
    } else if (priceRange?.min || priceRange?.max) {
      // Price range filter
      products = getProductsByPriceRange(
        priceRange.min || 0, 
        priceRange.max || 9999
      );
    } else if (inStockOnly) {
      // In-stock products only
      products = getProductsInStock();
    } else if (withDiscount) {
      // Products with discounts
      products = getProductsWithDiscount();
    } else {
      // Default to recommended products
      products = getRecommendedProducts(category, maxProducts);
    }

    // Apply additional filters
    if (inStockOnly) {
      products = products.filter(p => p && p.stock > 0);
    }
    if (withDiscount) {
      products = products.filter(p => p && p.originalPrice && p.originalPrice > p.price);
    }

    // Limit results
    products = products.slice(0, maxProducts);

    return {
      type: 'product_carousel',
      title: title || 'Products',
      subtitle: subtitle,
      products,
      showStock,
      showFeatures,
      totalFound: products.length
    };
  },
});

// Product Details Tool
export const productDetailsTool = createTool({
  description: 'Get detailed information about a specific product',
  parameters: z.object({
    productId: z.string().describe('The ID of the product to get details for'),
    includeSpecs: z.boolean().optional().describe('Whether to include technical specifications'),
    includeFeatures: z.boolean().optional().describe('Whether to include feature list')
  }),
  execute: async function ({ productId, includeSpecs = true, includeFeatures = true }) {
    const product = getProductById(productId);
    
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }

    return {
      type: 'product_details',
      product: {
        ...product,
        specs: includeSpecs ? product.specs : undefined,
        features: includeFeatures ? product.features : undefined
      }
    };
  },
});

// Inventory Summary Tool
export const inventorySummaryTool = createTool({
  description: 'Get a summary of current inventory status',
  parameters: z.object({
    category: z.string().optional().describe('Category to summarize (laptops, accessories, etc.)'),
    includeLowStock: z.boolean().optional().describe('Include low stock alerts'),
    includeOutOfStock: z.boolean().optional().describe('Include out of stock items')
  }),
  execute: async function ({ category, includeLowStock = true, includeOutOfStock = true }) {
    const allProducts = getAllProducts();
    const categoryProducts = category ? getProductsByCategory(category) : allProducts;
    
    const summary: {
      type: string;
      category: string;
      totalProducts: number;
      inStock: number;
      lowStock: number;
      outOfStock: number;
      withDiscounts: number;
      totalValue: number;
      lowStockItems?: Array<{ id: string; name: string; stock: number }>;
      outOfStockItems?: Array<{ id: string; name: string }>;
    } = {
      type: 'inventory_summary',
      category: category || 'all',
      totalProducts: categoryProducts.length,
      inStock: categoryProducts.filter(p => p.stock > 0).length,
      lowStock: categoryProducts.filter(p => p.stock > 0 && p.stock <= 3).length,
      outOfStock: categoryProducts.filter(p => p.stock === 0).length,
      withDiscounts: categoryProducts.filter(p => p.originalPrice && p.originalPrice > p.price).length,
      totalValue: categoryProducts.reduce((sum, p) => sum + (p.price * p.stock), 0)
    };

    if (includeLowStock) {
      summary.lowStockItems = categoryProducts
        .filter(p => p.stock > 0 && p.stock <= 3)
        .map(p => ({ id: p.id, name: p.name, stock: p.stock }));
    }

    if (includeOutOfStock) {
      summary.outOfStockItems = categoryProducts
        .filter(p => p.stock === 0)
        .map(p => ({ id: p.id, name: p.name }));
    }

    return summary;
  },
});

// Export all tools
export const tools = {
  getProductCarousel: productCarouselTool,
  getProductDetails: productDetailsTool,
  getInventorySummary: inventorySummaryTool,
}; 