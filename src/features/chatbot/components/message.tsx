import { UIMessage } from "ai";
import { Sparkles } from "lucide-react";
import React from "react";
import MarkdownRenderer from "@/components/ui/markdown";
import ProductCarousel from "@/components/products/carousel";
import ProductDetails from "@/components/products/details";
import InventorySummary from "@/components/products/inventory-summary";
import { Product } from "@/components/products/card";

interface MessageProps {
  message: UIMessage;
  isStreaming: boolean;
  msgIndex: number;
  messagesLength: number;
}

// Sub-component for the message header with role indicator
interface MessageHeaderProps {
  role: string;
}

const MessageHeader = ({ role }: MessageHeaderProps) => {
  return (
    <div className="flex items-center gap-2">
      {role === "assistant" && <Sparkles className="w-4 h-4 text-gray-400" />}
      <span className="font-medium text-sm text-gray-600">
        {role === "assistant" ? "AI Assistant" : "You"}
      </span>
    </div>
  );
};

// Tool result types
interface ProductCarouselResult {
  type: "product_carousel";
  title?: string;
  subtitle?: string;
  products: Product[];
  showStock: boolean;
  showFeatures: boolean;
  compact?: boolean;
  totalFound: number;
}

interface ProductDetailsResult {
  type: "product_details";
  product: Product & {
    specs?: Record<string, string>;
  };
}

interface InventorySummaryResult {
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
}

// Sub-component for the message content with tool invocations support
interface MessageContentProps {
  role: string;
  content: string;
  isStreaming: boolean;
  parts?: Array<{
    type: string;
    toolInvocation?: {
      toolName: string;
      toolCallId: string;
      state: string;
      result?:
        | ProductCarouselResult
        | ProductDetailsResult
        | InventorySummaryResult;
    };
  }>;
}

const MessageContent = ({
  role,
  content,
  parts,
  isStreaming,
}: MessageContentProps) => {
  const handleProductClick = (product: Product) => {
    console.log("Product clicked:", product);
    window.open(product.refUrl, "_blank");
  };

  // Extract tool invocations from parts
  const toolInvocations =
    parts
      ?.filter((part) => part.type === "tool-invocation")
      .map((part) => part.toolInvocation)
      .filter(
        (
          toolInvocation
        ): toolInvocation is NonNullable<typeof toolInvocation> =>
          toolInvocation !== undefined
      ) || [];

  return (
    <div className="text-left space-y-4">
      {role === "assistant" ? (
        <>
          {content && (
            <MarkdownRenderer
              content={content}
              className="prose-sm max-w-none"
            />
          )}

          {/* Tool Invocation Components */}
          {toolInvocations?.map((toolInvocation) => {
            const { toolName, toolCallId, state, result } = toolInvocation;

            if (state === "result" && !isStreaming) {
              // Product Carousel
              if (
                toolName === "getProductCarousel" &&
                result?.type === "product_carousel"
              ) {
                const carouselResult = result as ProductCarouselResult;
                return (
                  <div key={toolCallId} className="mt-4">
                    <ProductCarousel
                      products={carouselResult.products || []}
                      title={carouselResult.title}
                      subtitle={carouselResult.subtitle}
                      onProductClick={handleProductClick}
                      showStock={carouselResult.showStock}
                      showFeatures={carouselResult.showFeatures}
                      compact={carouselResult.compact}
                    />
                  </div>
                );
              }

              // Product Details
              if (
                toolName === "getProductDetails" &&
                result?.type === "product_details"
              ) {
                const detailsResult = result as ProductDetailsResult;
                return (
                  <div key={toolCallId} className="mt-4">
                    <ProductDetails
                      product={detailsResult.product}
                      onProductClick={handleProductClick}
                    />
                  </div>
                );
              }

              // Inventory Summary
              if (
                toolName === "getInventorySummary" &&
                result?.type === "inventory_summary"
              ) {
                const summaryResult = result as InventorySummaryResult;
                return (
                  <div key={toolCallId} className="mt-4">
                    <InventorySummary data={summaryResult} />
                  </div>
                );
              }
            } else {
              // Loading state
              return null;
            }
          })}
        </>
      ) : (
        <p className="text-gray-900 leading-relaxed text-base">{content}</p>
      )}
    </div>
  );
};

// Sub-component for the typing indicator during streaming
const TypingIndicator = () => {
  return (
    <div className="mt-1 flex items-center gap-1">
      <div className="flex space-x-0.5">
        <div className="w-1 h-1 bg-gray-400 rounded-full animate-ping delay-150" />
        <div className="w-1 h-1 bg-gray-400 rounded-full animate-ping delay-300" />
        <div className="w-1 h-1 bg-gray-400 rounded-full animate-ping delay-450" />
      </div>
    </div>
  );
};

// Main component that orchestrates the sub-components
const ChatBotMessage = ({
  message,
  isStreaming,
  msgIndex,
  messagesLength,
}: MessageProps) => {
  const { content, role, parts } = message;
  const isLastMessage = msgIndex === messagesLength - 1;
  const isAssistantStreaming =
    isStreaming && role === "assistant" && isLastMessage;

  return (
    <div className="flex flex-col gap-3 transition-all duration-300 ease-in-out message-enter px-2 py-4">
      <MessageHeader role={role} />
      <MessageContent
        role={role}
        content={content}
        parts={parts}
        isStreaming={isStreaming}
      />

      {/* Enhanced typing indicator for streaming */}
      {isAssistantStreaming && <TypingIndicator />}
    </div>
  );
};

export default ChatBotMessage;
