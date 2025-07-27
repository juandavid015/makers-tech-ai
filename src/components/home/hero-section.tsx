import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Background Gradient Orb Effect - Much Larger */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px]">
        <div className="relative w-full h-full">
          {/* Main Large Translucent Orb */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 via-purple-200/30 to-white/50 rounded-full blur-3xl"></div>

          {/* Inner Glow Layer */}
          <div className="absolute inset-8 bg-gradient-to-br from-blue-100/50 via-purple-100/40 to-white/60 rounded-full blur-2xl"></div>

          {/* Highlight Effect */}
          <div className="absolute top-16 left-16 w-64 h-64 bg-white/70 rounded-full blur-xl"></div>

          {/* Secondary Glow */}
          <div className="absolute bottom-16 right-16 w-48 h-48 bg-purple-200/50 rounded-full blur-xl"></div>

          {/* Additional Inner Layers */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100/30 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Additional Large Floating Orbs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-200/25 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 left-5 w-80 h-80 bg-blue-100/35 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/4 right-5 w-72 h-72 bg-purple-100/30 rounded-full blur-2xl"></div>

      {/* Extra Large Background Orb */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-200/20 to-purple-200/15 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-l from-purple-200/25 to-blue-200/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-light text-gray-900 leading-tight">
                Elevate Your
                <span className="block font-medium">Digital World</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Discover cutting-edge technology that transforms the way you
                work, play, and create. Where innovation meets elegance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <Button
                size="lg"
                variant="primary"
                className="px-8 py-4 text-lg font-medium"
              >
                Explore Collection
                <ArrowRight className="w-5 h-5" />
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

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/26545222/pexels-photo-26545222.jpeg"
                alt="Premium Technology"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-600/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 