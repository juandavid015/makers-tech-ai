import { UIMessage } from "ai";

// Use UIMessage directly since it already includes toolInvocations
export type ChatMessage = UIMessage;

// Props interfaces for components
export interface MessagesContainerProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export interface ChatInterfaceProps {
  messages: ChatMessage[];
  input: string;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export interface DebugInfoProps {
  messages: ChatMessage[];
  isLoading: boolean;
  input: string;
} 