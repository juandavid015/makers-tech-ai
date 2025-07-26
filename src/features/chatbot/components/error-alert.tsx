import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ChatBotErrorAlertProps {
  error?: Error;
  reload: () => void;
}

const ChatBotErrorAlert = ({ error, reload }: ChatBotErrorAlertProps) => {
  if (!error) return null;
  return (
    <Alert variant={"destructive"}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error :(</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        Seems like something went wrong. Please try again.
        <Button
          type="button"
          onClick={() => reload()}
          variant={"outline"}
          className="cursor-pointer w-full"
        >
          <RotateCcw className="w-5 h-5" />
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ChatBotErrorAlert;
