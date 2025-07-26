"use client";

import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";

import { useEffect } from "react";

import ChatBotMessages from "./messages";
import ChatBotErrorAlert from "./error-alert";
import ChatBotControls from "./controls";

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
  } = useChat({});

  const isStreaming = status === "streaming";

  // Smooth scroll to bottom while streaming or new messages are added
  useEffect(() => {
    const container = document.querySelector(".chat-container");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isStreaming]);

  return (
    <div
      className={cn(
        "flex flex-col gap-6 p-8 bg-white rounded-lg",
        "border border-l border-gray-100",
        "h-full max-w-lg w-full max-h-screen",
        className
      )}
    >
      <ChatBotMessages messages={messages} isStreaming={isStreaming} />
      <ChatBotErrorAlert error={error} reload={reload} />
      <ChatBotControls
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        input={input}
        isStreaming={isStreaming}
        stop={stop}
      />
    </div>
  );
};

export default Chatbot;
