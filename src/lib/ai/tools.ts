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
  getProductsWithDiscount,
  findProductByName
} from '@/server/actions/products';

// Product matching intelligence
const PRODUCT_MAPPINGS: Record<string, string> = {
  'logitech mx': 'logitech-mx-master-3',
  'logitech mx master': 'logitech-mx-master-3',
  'logitech mx master 3': 'logitech-mx-master-3',
  'hp pavilion': 'hp-pavilion-15',
  'hp pavilion 15': 'hp-pavilion-15',
  'macbook': 'macbook-pro-m2',
  'macbook pro': 'macbook-pro-m2',
  'macbook pro m2': 'macbook-pro-m2',
  'dell inspiron': 'dell-inspiron-15',
  'dell inspiron 15': 'dell-inspiron-15',
  'corsair k70': 'corsair-k70-rgb',
  'corsair k70 rgb': 'corsair-k70-rgb',
  'dell ultrasharp': 'dell-ultrasharp-27',
  'dell ultrasharp 27': 'dell-ultrasharp-27',
  'logitech c920': 'logitech-c920',
  'logitech c920 hd pro': 'logitech-c920',
};

const CATEGORY_MAPPINGS: Record<string, string> = {
  'keyboard': 'keyboards',
  'keyboards': 'keyboards',
  'mouse': 'mice',
  'mice': 'mice',
  'monitor': 'monitors',
  'monitors': 'monitors',
  'webcam': 'webcams',
  'webcams': 'webcams',
  'headset': 'headsets',
  'headsets': 'headsets',
  'laptop': 'laptops',
  'laptops': 'laptops',
  'computer': 'laptops',
  'computers': 'laptops',
  'accessory': 'accessories',
  'accessories': 'accessories',
  'peripheral': 'accessories',
  'peripherals': 'accessories',
};

// Helper function to find specific product by name
const findSpecificProduct = async (query: string): Promise<string | null> => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Check direct mappings first
  if (PRODUCT_MAPPINGS[normalizedQuery]) {
    return PRODUCT_MAPPINGS[normalizedQuery];
  }
  
  // Use the enhanced findProductByName function
  const product = await findProductByName(normalizedQuery);
  return product?.id || null;
};

// Helper function to determine if query is for specific product
const isSpecificProductQuery = (query: string): boolean => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Check if query contains specific product names
  const specificProductKeywords = [
    'logitech mx', 'hp pavilion', 'macbook', 'dell inspiron',
    'corsair k70', 'dell ultrasharp', 'logitech c920'
  ];
  
  return specificProductKeywords.some(keyword => 
    normalizedQuery.includes(keyword)
  );
};

// Helper function to determine if query is for category
const isCategoryQuery = (query: string): boolean => {
  const normalizedQuery = query.toLowerCase().trim();
  
  const categoryKeywords = [
    'keyboard', 'keyboards', 'mouse', 'mice', 'monitor', 'monitors',
    'webcam', 'webcams', 'headset', 'headsets', 'laptop', 'laptops',
    'computer', 'computers', 'accessory', 'accessories', 'peripheral', 'peripherals'
  ];
  
  return categoryKeywords.some(keyword => 
    normalizedQuery.includes(keyword)
  );
};

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
      const productPromises = productIds.map(id => getProductById(id));
      const resolvedProducts = await Promise.all(productPromises);
      products = resolvedProducts.filter(Boolean);
    } else if (category) {
      // Category-based products with enhanced matching
      products = await getProductsByCategory(category);
    } else if (search) {
      // Search-based products with enhanced search
      products = await searchProducts(search);
    } else if (priceRange?.min || priceRange?.max) {
      // Price range filter
      products = await getProductsByPriceRange(
        priceRange.min || 0, 
        priceRange.max || 9999
      );
    } else if (inStockOnly) {
      // In-stock products only
      products = await getProductsInStock();
    } else if (withDiscount) {
      // Products with discounts
      products = await getProductsWithDiscount();
    } else {
      // Default to recommended products
      products = await getRecommendedProducts(category, maxProducts);
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
    productId: z.string().optional().describe('The ID of the product to get details for'),
    productName: z.string().optional().describe('The name of the product to search for'),
    includeSpecs: z.boolean().optional().describe('Whether to include technical specifications'),
    includeFeatures: z.boolean().optional().describe('Whether to include feature list')
  }),
  execute: async function ({ productId, productName, includeSpecs = true, includeFeatures = true }) {
    let finalProductId = productId;
    
    // If productName is provided, try to find the product
    if (productName && !productId) {
      const foundProductId = await findSpecificProduct(productName);
      if (foundProductId) {
        finalProductId = foundProductId;
      }
    }
    
    if (!finalProductId) {
      throw new Error(`Product not found: ${productName || productId}`);
    }

    const product = await getProductById(finalProductId);
    
    if (!product) {
      throw new Error(`Product with ID ${finalProductId} not found`);
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
    productName: z.string().optional().describe('Specific product name to check stock for'),
    includeLowStock: z.boolean().optional().describe('Include low stock alerts'),
    includeOutOfStock: z.boolean().optional().describe('Include out of stock items')
  }),
  execute: async function ({ category, productName, includeLowStock = true, includeOutOfStock = true }) {
    // If productName is provided, get specific product details instead
    if (productName) {
      const productId = await findSpecificProduct(productName);
      if (productId) {
        const product = await getProductById(productId);
        if (product) {
          return {
            type: 'product_details',
            product: {
              ...product,
              specs: product.specs,
              features: product.features
            }
          };
        }
      }
    }

    const allProducts = await getAllProducts();
    const categoryProducts = category ? await getProductsByCategory(category) : allProducts;
    
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