"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X,
  Heart
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Laptops", href: "/" },
    { name: "Accessories", href: "/" },
    { name: "Gaming", href: "/" },
    { name: "Deals", href: "/" },
    { name: "Support", href: "/" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      {/* Main Header */}
      <div className="container mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center ">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              <Image src="/images/makers_logo.png" alt="Makers Tech" width={50} height={50} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-black font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-black">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-black">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-black relative">
                <ShoppingCart className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-black text-white rounded-full flex items-center justify-center">
                  3
                </Badge>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="container mx-auto px-6 lg:px-8 py-4">
            <nav className="space-y-4">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-black font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            
            <div className="flex items-center space-x-4 mt-6 pt-4 border-t border-gray-100">
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-black">
                <Heart className="w-5 h-5 mr-2" />
                Wishlist
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-black">
                <User className="w-5 h-5 mr-2" />
                Account
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-700 hover:text-black relative">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart
                <Badge className="absolute -top-1 -right-1 w-5 h-5 text-xs bg-black text-white rounded-full flex items-center justify-center">
                  3
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 