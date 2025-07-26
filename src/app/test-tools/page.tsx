"use client";

import React from "react";
import { useChat } from "@ai-sdk/react";
import { ChatMessage, MessagesContainerProps, ChatInterfaceProps, DebugInfoProps } from "@/lib/types/chat";
import { ToolInvocation } from "ai";

// Sub-component: Page Header
const PageHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        🧪 AI Tools Test Page
      </h1>
      <p className="text-gray-600 mb-6">
        Test the new tool-based AI system. Try these example queries:
      </p>
    </div>
  );
};

// Sub-component: Example Query Button
interface ExampleQueryButtonProps {
  query: string;
  description: string;
  color: "blue" | "green" | "purple";
  onClick: (query: string) => void;
}

const ExampleQueryButton: React.FC<ExampleQueryButtonProps> = ({
  query,
  description,
  color,
  onClick,
}) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-900 text-blue-700",
    green: "bg-green-50 border-green-200 hover:bg-green-100 text-green-900 text-green-700",
    purple: "bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-900 text-purple-700",
  };

  const [bgColor, borderColor, hoverColor, titleColor, descColor] = colorClasses[color].split(" ");

  return (
    <button
      onClick={() => onClick(query)}
      className={`p-3 ${bgColor} border ${borderColor} rounded-lg text-left ${hoverColor} transition-colors`}
    >
      <div className={`font-medium ${titleColor}`}>{query}</div>
      <div className={`text-sm ${descColor}`}>{description}</div>
    </button>
  );
};

// Sub-component: Example Queries
interface ExampleQueriesProps {
  onQueryClick: (query: string) => void;
}

const ExampleQueries: React.FC<ExampleQueriesProps> = ({ onQueryClick }) => {
  const examples = [
    {
      query: "Show me your laptops",
      description: "Tests product carousel tool",
      color: "blue" as const,
    },
    {
      query: "What's your inventory status?",
      description: "Tests inventory summary tool",
      color: "green" as const,
    },
    {
      query: "Tell me about the HP Pavilion",
      description: "Tests product details tool",
      color: "purple" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {examples.map((example, index) => (
        <ExampleQueryButton
          key={index}
          query={example.query}
          description={example.description}
          color={example.color}
          onClick={onQueryClick}
        />
      ))}
    </div>
  );
};

// Sub-component: Message
interface MessageProps {
  message: ChatMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-lg p-3 ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="text-sm font-medium mb-1">
          {isUser ? "You" : "AI Assistant"}
        </div>
        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
        
        {/* Tool Invocations */}
        {message.toolInvocations && message.toolInvocations.length > 0 && (
          <ToolInvocations toolInvocations={message.toolInvocations} />
        )}
      </div>
    </div>
  );
};

// Sub-component: Tool Invocations
interface ToolInvocationsProps {
  toolInvocations: ToolInvocation[];
}

const ToolInvocations: React.FC<ToolInvocationsProps> = ({ toolInvocations }) => {
  return (
    <div className="mt-3 pt-3 border-t border-gray-200">
      <div className="text-xs font-medium text-gray-500 mb-2">
        Tool Invocations:
      </div>
      {toolInvocations.map((toolInvocation) => (
        <div key={toolInvocation.toolCallId} className="text-xs bg-gray-50 p-2 rounded mb-1">
          <div className="font-medium">{toolInvocation.toolName}</div>
          <div className="text-gray-600">State: {toolInvocation.state}</div>
          {'result' in toolInvocation && toolInvocation.result && (
            <div className="text-gray-600">
              Result: <pre className="text-xs">{JSON.stringify(toolInvocation.result as Record<string, unknown>, null, 2)}</pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Sub-component: Loading Message
const LoadingMessage: React.FC = () => {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-100 text-gray-900 rounded-lg p-3">
        <div className="text-sm font-medium mb-1">AI Assistant</div>
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm">Thinking...</span>
        </div>
      </div>
    </div>
  );
};

// Sub-component: Messages Container
const MessagesContainer: React.FC<MessagesContainerProps> = ({ messages, isLoading }) => {
  return (
    <div className="h-96 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      
      {isLoading && <LoadingMessage />}
    </div>
  );
};

// Sub-component: Chat Input
interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  isLoading,
  onInputChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="border-t border-gray-200 p-4">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={onInputChange}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </div>
    </form>
  );
};

// Sub-component: Chat Interface
const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  input,
  isLoading,
  onInputChange,
  onSubmit,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <MessagesContainer messages={messages} isLoading={isLoading} />
      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

// Sub-component: Debug Info
const DebugInfo: React.FC<DebugInfoProps> = ({ messages, isLoading, input }) => {
  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium text-gray-900 mb-2">Debug Information</h3>
      <div className="text-sm text-gray-600">
        <div>Total Messages: {messages.length}</div>
        <div>Loading: {isLoading ? "Yes" : "No"}</div>
        <div>Input Value: &quot;{input}&quot;</div>
      </div>
    </div>
  );
};

// Main TestToolsPage component
export default function TestToolsPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  const handleQueryClick = (query: string) => {
    handleInputChange({ target: { value: query } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <PageHeader />
      <ExampleQueries onQueryClick={handleQueryClick} />

      <ChatInterface
        messages={messages}
        input={input}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />

      <DebugInfo messages={messages} isLoading={isLoading} input={input} />
    </div>
  );
} 