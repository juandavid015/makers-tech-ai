import React from "react";
import { Button } from "@/components/ui/button";

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

export default CTASection; 