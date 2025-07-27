# Makers Tech - Technology E-commerce Platform

A modern, minimalist technology e-commerce website built with Next.js, React, and Tailwind CSS.

## 🚀 Features

### Main Page
- **Hero Section**: Elegant landing with gradient orb effects
- **Products Section**: Grid display of all products with filtering
- **CTA Section**: Call-to-action with modern design
- **Header/Footer**: Clean navigation and branding

### Product Details Page
- **Dynamic Routing**: `/products/[id]` for individual product pages
- **Dark Theme**: Sleek black background with green accents
- **Image Carousel**: Multiple product views with navigation
- **Size Selection**: For laptops (13.3", 14", 15.6", 17")
- **Quantity Selector**: Interactive quantity controls
- **Stock Management**: Real-time stock status display
- **Action Buttons**: Add to Cart and Buy Now functionality

### Design System
- **Modern UI**: Clean, minimalist aesthetic
- **Responsive Design**: Mobile-first approach
- **Button Variants**: Multiple button styles for different contexts
- **Color Scheme**: Black/white with green accents
- **Typography**: Clean, readable fonts

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Components**: Custom UI components with Radix UI
- **Icons**: Lucide React
- **Data**: JSON-based product database
- **AI Integration**: Custom chatbot with product recommendations

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Main landing page
│   ├── products/
│   │   ├── layout.tsx          # Products layout
│   │   └── [id]/
│   │       └── page.tsx        # Product details page
│   └── globals.css             # Global styles
├── components/
│   ├── layout/
│   │   ├── header.tsx          # Site header
│   │   └── footer.tsx          # Site footer
│   ├── products/
│   │   └── card.tsx            # Product card component
│   └── ui/
│       ├── button.tsx          # Button component
│       ├── badge.tsx           # Badge component
│       ├── loading.tsx         # Loading component
│       └── error-boundary.tsx  # Error boundary
├── server/
│   └── actions/
│       └── products.ts         # Product data functions
├── data/
│   └── products.json           # Product database
└── lib/
    ├── utils.ts                # Utility functions
    └── ai/
        └── system.ts           # AI system prompt
```

## 🎨 Design Features

### Product Details Page
- **Dark Theme**: Black background (#000000)
- **Green Accents**: Vibrant green (#10B981) for highlights
- **Typography**: Large, bold headings with clean hierarchy
- **Layout**: Two-column grid (images left, details right)
- **Interactive Elements**: Hover effects, transitions, focus states

### Button System
- **Primary**: Green background with black text
- **Outline**: Green border with green text, hover to fill
- **Ghost**: Subtle hover effects for navigation
- **Sizes**: xs, sm, default, lg, xl, icon variants

## 🔧 API Integration

### Product Data
- **getProductById**: Fetch individual product details
- **getAllProducts**: Get all products for main page
- **getProductsByCategory**: Filter by category
- **searchProducts**: Search functionality
- **getInventorySummary**: Stock management

### Simulated API Calls
- Loading states with 800ms delay
- Error handling for missing products
- Console logging for debugging
- Alert notifications for user actions

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **View Product Details**
   - Navigate to `/products/hp-pavilion-15`
   - Or click any product card on the main page

## 📱 Responsive Design

- **Mobile**: Single column layout, optimized touch targets
- **Tablet**: Adaptive grid layouts
- **Desktop**: Full two-column product details layout

## 🎯 Future Enhancements

- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Payment integration
- [ ] Product reviews and ratings
- [ ] Advanced filtering and search
- [ ] Wishlist functionality
- [ ] Order tracking
- [ ] Admin dashboard


