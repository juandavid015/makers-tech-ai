import { UIMessage } from "ai";
import ChatBotMessage from "./message";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { useQuickActions } from "@/hooks/useQuickActions";

interface ChatBotMessagesProps {
  messages: UIMessage[];
  isStreaming: boolean;
  onQuickAction?: (action: string) => void;
}

// Sub-component for the message header with count and streaming indicator
interface MessageHeaderProps {
  messagesLength: number;
  isStreaming: boolean;
}

const MessageHeader = ({ messagesLength, isStreaming }: MessageHeaderProps) => {
  return (
    <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-3">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <MessageCircle className="w-4 h-4" />
        <span>{messagesLength} message{messagesLength !== 1 ? 's' : ''}</span>
        {isStreaming && (
          <div className="flex items-center gap-1 ml-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-blue-600 text-xs">AI responding...</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Sub-component for the list of messages with animations
interface MessageListProps {
  messages: UIMessage[];
  isStreaming: boolean;
}

const MessageList = ({ messages, isStreaming }: MessageListProps) => {
  return (
    <div className="flex flex-col gap-2 p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "transition-all duration-500 ease-out",
            index === messages.length - 1
              ? "animate-in slide-in-from-bottom-2 fade-in-0"
              : ""
          )}
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
    </div>
  );
};

// Sub-component for the animated orb visual element
const AnimatedOrb = () => {
  return (
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
  );
};

// Sub-component for the greeting text
const GreetingText = () => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="text-xl font-medium text-gray-800">Hello!</h2>
      <p className="text-lg">
        <span className="text-gray-800">How can I </span>
        <span className="text-blue-600 font-medium">assist you?</span>
      </p>
    </div>
  );
};

// Sub-component for the quick action buttons
interface QuickActionsProps {
  quickActions: ReturnType<typeof useQuickActions>['quickActions'];
  onActionClick: (action: ReturnType<typeof useQuickActions>['quickActions'][0]) => void;
}

const QuickActions = ({ quickActions, onActionClick }: QuickActionsProps) => {
  return (
    <div className="w-full max-w-md">
      <div className="flex flex-wrap gap-2 justify-center">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => onActionClick(action)}
            className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors duration-200 flex items-center gap-1"
          >
            <span>{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Sub-component for the empty state message indicator
interface ChatBotMessageIndicatorProps {
  quickActions: ReturnType<typeof useQuickActions>['quickActions'];
  onActionClick: (action: ReturnType<typeof useQuickActions>['quickActions'][0]) => void;
}

const ChatBotMessageIndicator = ({ quickActions, onActionClick }: ChatBotMessageIndicatorProps) => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-64 text-center">
      <AnimatedOrb />
      <GreetingText />
      <QuickActions quickActions={quickActions} onActionClick={onActionClick} />
    </div>
  );
};

// Main component that orchestrates the sub-components
const ChatBotMessages = ({ messages, isStreaming, onQuickAction }: ChatBotMessagesProps) => {
  const { quickActions, handleActionClick } = useQuickActions(onQuickAction || (() => {}));

  return (
    <div className="flex flex-col flex-1 overflow-y-auto chat-container scroll-smooth bg-gradient-to-b from-gray-50/50 to-white">
      {messages.length > 0 && (
        <MessageHeader messagesLength={messages.length} isStreaming={isStreaming} />
      )}
      
      <MessageList messages={messages} isStreaming={isStreaming} />

      {/* Enhanced message indicator */}
      {messages.length === 0 && (
        <ChatBotMessageIndicator 
          quickActions={quickActions}
          onActionClick={handleActionClick}
        />
      )}
    </div>
  );
};

export default ChatBotMessages;
