"use client";

import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";

import { useEffect, useRef } from "react";

import ChatBotMessages from "./messages";
import ChatBotErrorAlert from "./error-alert";
import ChatBotControls from "./controls";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sparkles } from "lucide-react";

interface ChatbotContainerProps {
  className?: string;
}

const Chatbot = ({ className }: ChatbotContainerProps) => {
  const {
    messages,
    input,
    handleSubmit,
    handleInputChange,
    status,
    error,
    reload,
    stop,
    setInput,
  } = useChat({});

  const isStreaming = status === "streaming";
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Smooth scroll to bottom while streaming or new messages are added
  useEffect(() => {
    const container = document.querySelector(".chat-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isStreaming]);

  // Handle quick action selection
  const handleQuickAction = (action: string) => {
    setInput(action);
    // Focus the input field
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          "fixed top-20 right-4 w-12 h-12 rounded-full p-0 flex items-center justify-center cursor-pointer",
          "bg-gradient-to-br from-purple-200 via-blue-200 to-purple-300 hover:from-purple-300",
          "hover:via-blue-200 hover:to-purple-300 transition-all duration-300 shadow-lg hover:shadow-xl border-0 backdrop-blur-sm z-50"
        )}
      >
        <Sparkles className="w-5 h-5 text-gray-700" />
      </SheetTrigger>
      <SheetContent
        className={cn(
          "flex flex-col gap-6 p-4 bg-white rounded-lg",
          "border border-l border-gray-100",
          "h-full max-w-lg w-full max-h-screen",
          className
        )}
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
            <Sparkles className="w-5 h-5" />
            Makers Tech AI
          </SheetTitle>
        </SheetHeader>

        <ChatBotMessages 
          messages={messages} 
          isStreaming={isStreaming} 
          onQuickAction={handleQuickAction}
        />
        <ChatBotErrorAlert error={error} reload={reload} />
        <ChatBotControls
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          input={input}
          isStreaming={isStreaming}
          stop={stop}
          inputRef={inputRef}
        />
      </SheetContent>
    </Sheet>
  );
};

export default Chatbot;
