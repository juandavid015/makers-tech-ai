import { UIMessage } from "ai";
import ChatBotMessage from "./message";
import { cn } from "@/lib/utils";

interface ChatBotMessagesProps {
  messages: UIMessage[];
  isStreaming: boolean;
}

const ChatBotMessages = ({ messages, isStreaming }: ChatBotMessagesProps) => {
  return (
    <div className="flex flex-col gap-4 flex-1 overflow-y-auto chat-container scroll-smooth">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`transition-all duration-500 ease-out ${
            index === messages.length - 1
              ? "animate-in slide-in-from-bottom-2 fade-in-0"
              : ""
          }`}
          style={{
            animationDelay: index === messages.length - 1 ? "0ms" : "0ms",
            animationFillMode: "both",
          }}
        >
          <ChatBotMessage
            message={message}
            isStreaming={isStreaming}
            msgIndex={index}
            messagesLength={messages.length}
          />
        </div>
      ))}

      {/* Message indicator */}
      {messages.length === 0 && <ChatBotMessageIndicator />}
    </div>
  );
};

const ChatBotMessageIndicator = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-64 text-center">
      {/* Translucent spherical orb */}
      <div className="relative">
        <div
          className={cn(
            "w-24 h-24 rounded-full ",
            "bg-gradient-to-br from-blue-200 via-purple-200 to-indigo-300 ",
            "shadow-lg backdrop-blur-sm border border-white/20 animate-pulse",
            " [animation-duration:3s] [animation-timing-function:ease-in-out]"
          )}
        >
          <div
            className={cn(
              "absolute inset-0 rounded-full ",
              "bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-indigo-200/30",
              "animate-ping [animation-duration:4s] [animation-delay:1s]"
            )}
          />
          <div
            className={cn(
              "absolute inset-2 rounded-full ",
              "bg-gradient-to-br from-white/20 to-transparent"
            )}
          />
          <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-white/60" />
          <div className="absolute top-6 right-4 w-1 h-1 rounded-full bg-white/40" />
        </div>
      </div>

      {/* Greeting text */}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-medium text-gray-800">Hello!</h2>
        <p className="text-lg">
          <span className="text-gray-800">How can i </span>
          <span className="text-blue-600 font-medium">assist you?</span>
        </p>
      </div>
    </div>
  );
};

export default ChatBotMessages;
