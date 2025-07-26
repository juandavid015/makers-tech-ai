import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Send, Square, Sparkles } from "lucide-react";
import { RefObject } from "react";

interface ChatBotControlsProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  input: string;
  isStreaming: boolean;
  stop: () => void;
  inputRef?: RefObject<HTMLTextAreaElement | null>;
}

// Sub-component for the input field with status indicator
interface InputFieldProps {
  input: string;
  isStreaming: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inputRef?: RefObject<HTMLTextAreaElement | null>;
}

const InputField = ({
  input,
  isStreaming,
  handleInputChange,
  inputRef,
}: InputFieldProps) => {
  const hasInput = input.trim().length > 0;

  return (
    <div className="relative flex-1">
      <Textarea
        ref={inputRef}
        className={cn(
          "transition-all duration-300 pr-10 focus-visible:border-blue-400 ",
          "focus-visible:ring-blue-400/50 focus-visible:ring-[3px] resize-none min-h-[40px] max-h-52",
          isStreaming
            ? "opacity-60 bg-gray-50 border-gray-200 focus-visible:border-gray-200 focus-visible:ring-gray-200/50"
            : hasInput
            ? "border-blue-400 bg-blue-50/30"
            : "border-blue-200 hover:border-blue-300"
        )}
        value={input}
        onChange={handleInputChange}
        placeholder={
          isStreaming
            ? "AI is responding..."
            : "Ask me about our tech products..."
        }
        disabled={isStreaming}
      />

      {/* Input status indicator */}
      {hasInput && !isStreaming && (
        <div className="absolute right-3 top-3">
          <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
        </div>
      )}
    </div>
  );
};

// Sub-component for the send button
interface SendButtonProps {
  hasInput: boolean;
}

const SendButton = ({ hasInput }: SendButtonProps) => {
  return (
    <Button
      type="submit"
      variant="outline"
      aria-label="Send message"
      disabled={!hasInput}
      className={`transition-all duration-300 ${
        hasInput
          ? "bg-blue-50 text-blue-600 border-blue-400 hover:bg-blue-100 hover:border-blue-500 hover:scale-105 shadow-sm"
          : "opacity-50 bg-gray-100 border-gray-200 cursor-not-allowed"
      }`}
    >
      <Send className="w-5 h-5" />
    </Button>
  );
};

// Sub-component for the stop button
interface StopButtonProps {
  stop: () => void;
}

const StopButton = ({ stop }: StopButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      aria-label="Stop streaming"
      onClick={stop}
      className={cn(
        "transition-all duration-300 shadow-md",
        "bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600 hover:scale-105"
      )}
    >
      <Square className="w-5 h-5" />
    </Button>
  );
};

// Main component that orchestrates the sub-components
const ChatBotControls = ({
  handleSubmit,
  handleInputChange,
  input,
  isStreaming,
  stop,
  inputRef,
}: ChatBotControlsProps) => {
  const hasInput = input.trim().length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 pt-4 border-t border-gray-100 transition-all duration-300"
    >
      <InputField
        input={input}
        isStreaming={isStreaming}
        handleInputChange={handleInputChange}
        inputRef={inputRef}
      />

      {!isStreaming ? (
        <SendButton hasInput={hasInput} />
      ) : (
        <StopButton stop={stop} />
      )}
    </form>
  );
};

export default ChatBotControls;
