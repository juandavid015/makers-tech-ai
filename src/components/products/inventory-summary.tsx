"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  AlertTriangle,
  XCircle,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

interface InventorySummaryProps {
  data: {
    type: "inventory_summary";
    category: string;
    totalProducts: number;
    inStock: number;
    lowStock: number;
    outOfStock: number;
    withDiscounts: number;
    totalValue: number;
    lowStockItems?: Array<{ id: string; name: string; stock: number }>;
    outOfStockItems?: Array<{ id: string; name: string }>;
  };
  className?: string;
}

// Sub-component: Header
interface HeaderProps {
  category: string;
}

const Header: React.FC<HeaderProps> = ({ category }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <Package className="w-6 h-6 text-blue-600" />
      <div>
        <h3 className="text-xl font-semibold text-gray-900">
          Inventory Summary
        </h3>
        <p className="text-sm text-gray-600 capitalize">
          {category === "all" ? "All Categories" : category}
        </p>
      </div>
    </div>
  );
};

// Sub-component: Stats Grid
interface StatsGridProps {
  totalProducts: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
}

const StatsGrid: React.FC<StatsGridProps> = ({
  totalProducts,
  inStock,
  lowStock,
  outOfStock,
}) => {
  const stats = [
    {
      value: totalProducts,
      label: "Total Products",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      value: inStock,
      label: "In Stock",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      value: lowStock,
      label: "Low Stock",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      value: outOfStock,
      label: "Out of Stock",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className={cn("text-center p-4 rounded-lg", stat.bgColor)}>
          <div className={cn("text-2xl font-bold", stat.textColor)}>
            {stat.value}
          </div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

// Sub-component: Stock Status Bar
interface StockStatusBarProps {
  inStock: number;
  totalProducts: number;
}

const StockStatusBar: React.FC<StockStatusBarProps> = ({
  inStock,
  totalProducts,
}) => {
  const stockPercentage = totalProducts > 0 ? (inStock / totalProducts) * 100 : 0;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          Stock Status
        </span>
        <span className="text-sm text-gray-600">
          {stockPercentage.toFixed(1)}% in stock
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${stockPercentage}%` }}
        />
      </div>
    </div>
  );
};

// Sub-component: Additional Info
interface AdditionalInfoProps {
  withDiscounts: number;
  totalValue: number;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({
  withDiscounts,
  totalValue,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
        <TrendingUp className="w-5 h-5 text-purple-600" />
        <div>
          <div className="font-semibold text-purple-900">{withDiscounts}</div>
          <div className="text-sm text-purple-700">With Discounts</div>
        </div>
      </div>

      <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
        <DollarSign className="w-5 h-5 text-emerald-600" />
        <div>
          <div className="font-semibold text-emerald-900">
            ${totalValue.toLocaleString()}
          </div>
          <div className="text-sm text-emerald-700">Total Value</div>
        </div>
      </div>
    </div>
  );
};

// Sub-component: Low Stock Alert
interface LowStockAlertProps {
  lowStockItems: Array<{ id: string; name: string; stock: number }>;
}

const LowStockAlert: React.FC<LowStockAlertProps> = ({ lowStockItems }) => {
  if (!lowStockItems || lowStockItems.length === 0) return null;

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600" />
        <h4 className="font-semibold text-yellow-900">Low Stock Items</h4>
      </div>
      <div className="space-y-2">
        {lowStockItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-yellow-800">{item.name}</span>
            <Badge
              variant="secondary"
              className="bg-yellow-100 text-yellow-800"
            >
              {item.stock} left
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

// Sub-component: Out of Stock Alert
interface OutOfStockAlertProps {
  outOfStockItems: Array<{ id: string; name: string }>;
}

const OutOfStockAlert: React.FC<OutOfStockAlertProps> = ({ outOfStockItems }) => {
  if (!outOfStockItems || outOfStockItems.length === 0) return null;

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <XCircle className="w-5 h-5 text-red-600" />
        <h4 className="font-semibold text-red-900">Out of Stock Items</h4>
      </div>
      <div className="space-y-2">
        {outOfStockItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-red-800">{item.name}</span>
            <Badge
              variant="secondary"
              className="bg-red-100 text-red-800"
            >
              Out of Stock
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

// Sub-component: All Good Alert
const AllGoodAlert: React.FC = () => {
  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-green-600" />
        <span className="text-green-800 font-medium">
          All items are well stocked!
        </span>
      </div>
    </div>
  );
};

// Sub-component: Alerts Container
interface AlertsContainerProps {
  lowStockItems?: Array<{ id: string; name: string; stock: number }>;
  outOfStockItems?: Array<{ id: string; name: string }>;
}

const AlertsContainer: React.FC<AlertsContainerProps> = ({
  lowStockItems,
  outOfStockItems,
}) => {
  const hasAlerts = 
    (lowStockItems && lowStockItems.length > 0) ||
    (outOfStockItems && outOfStockItems.length > 0);

  if (!hasAlerts) {
    return <AllGoodAlert />;
  }

  return (
    <div className="space-y-4">
      <LowStockAlert lowStockItems={lowStockItems || []} />
      <OutOfStockAlert outOfStockItems={outOfStockItems || []} />
    </div>
  );
};

// Main InventorySummary component
const InventorySummary: React.FC<InventorySummaryProps> = ({
  data,
  className,
}) => {
  const {
    category,
    totalProducts,
    inStock,
    lowStock,
    outOfStock,
    withDiscounts,
    totalValue,
    lowStockItems,
    outOfStockItems,
  } = data;

  return (
    <div
      className={cn(
        "bg-white rounded-lg border border-gray-200 p-6",
        className
      )}
    >
      <Header category={category} />
      
      <StatsGrid
        totalProducts={totalProducts}
        inStock={inStock}
        lowStock={lowStock}
        outOfStock={outOfStock}
      />
      
      <StockStatusBar inStock={inStock} totalProducts={totalProducts} />
      
      <AdditionalInfo withDiscounts={withDiscounts} totalValue={totalValue} />
      
      <AlertsContainer
        lowStockItems={lowStockItems}
        outOfStockItems={outOfStockItems}
      />
    </div>
  );
};

export default InventorySummary;
