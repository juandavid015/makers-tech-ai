import { UIMessage } from "ai";
import { Sparkles } from "lucide-react";
import React from "react";

interface MessageProps {
  message: UIMessage;
  isStreaming: boolean;
  msgIndex: number;
  messagesLength: number;
}

const ChatBotMessage = ({
  message,
  isStreaming,
  msgIndex,
  messagesLength,
}: MessageProps) => {
  const { content, role } = message;
  const isLastMessage = msgIndex === messagesLength - 1;
  const isAssistantStreaming =
    isStreaming && role === "assistant" && isLastMessage;

  return (
    <div
      className="flex flex-col gap-3 transition-all duration-300 ease-in-out message-enter px-6 py-4"
    >
      <div className="flex items-center gap-2">
        {role === "assistant" && <Sparkles className="w-4 h-4 text-gray-400" />}
        <span className="font-medium text-sm text-gray-600">
          {role === "assistant" ? "AI Assistant" : "You"}
        </span>
      </div>

      <p className="text-gray-900 text-left leading-relaxed text-base">
        {content}
      </p>

      {/* Efecto de typing más realista */}
      {isAssistantStreaming && (
        <div className="mt-1 flex items-center gap-1">
          <div className="flex space-x-0.5">
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-ping delay-150" />
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-ping delay-300" />
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-ping delay-450" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBotMessage;
