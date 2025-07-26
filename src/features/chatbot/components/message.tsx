import { UIMessage } from "ai";
import { Sparkles } from "lucide-react";
import React from "react";
import MarkdownRenderer from "@/components/ui/markdown";

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

// Sub-component for the message content (markdown for assistant, plain text for user)
interface MessageContentProps {
  role: string;
  content: string;
}

const MessageContent = ({ role, content }: MessageContentProps) => {
  return (
    <div className="text-left">
      {role === "assistant" ? (
        <MarkdownRenderer content={content} className="prose-sm max-w-none" />
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
  const { content, role } = message;
  const isLastMessage = msgIndex === messagesLength - 1;
  const isAssistantStreaming =
    isStreaming && role === "assistant" && isLastMessage;

  return (
    <div className="flex flex-col gap-3 transition-all duration-300 ease-in-out message-enter px-2 py-4">
      <MessageHeader role={role} />
      <MessageContent role={role} content={content} />
      
      {/* Enhanced typing indicator for streaming */}
      {isAssistantStreaming && <TypingIndicator />}
    </div>
  );
};

export default ChatBotMessage;
