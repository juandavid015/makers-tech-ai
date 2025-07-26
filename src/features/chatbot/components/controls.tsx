import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Square, Loader2 } from "lucide-react";

interface ChatBotControlsProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
  isStreaming: boolean;
  stop: () => void;
}

const ChatBotControls = ({
  handleSubmit,
  handleInputChange,
  input,
  isStreaming,
  stop,
}: ChatBotControlsProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 pt-4 border-t border-gray-100 transition-all duration-300"
    >
      <Input
        className={`flex-1 transition-all duration-300 ${
          isStreaming ? "opacity-50 bg-gray-50" : ""
        }`}
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder={
          isStreaming ? "AI is responding..." : "Type your message..."
        }
        disabled={isStreaming}
      />

      {!isStreaming ? (
        <Button
          type="submit"
          variant={"outline"}
          aria-label="Send message"
          disabled={!input.trim()}
          className={`cursor-pointer chat-button transition-all duration-300 hover:scale-105 ${
            !input.trim()
              ? "opacity-50"
              : "hover:bg-blue-50 hover:border-blue-300"
          }`}
        >
          <Send className="w-5 h-5" />
        </Button>
      ) : (
        <Button
          type="button"
          variant={"outline"}
          aria-label="Stop streaming"
          onClick={stop}
          className="cursor-pointer chat-button transition-all duration-300 hover:scale-105 hover:bg-red-50 hover:border-red-300"
        >
          <Square className="w-5 h-5 text-red-500" />
        </Button>
      )}
    </form>
  );
};

export default ChatBotControls;
