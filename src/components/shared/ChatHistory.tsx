import { type UseChatOptions } from "@ai-sdk/react";
import { cn } from "@/lib/utils";
import { useGetChatById } from "@/services/Employees/Employees";
import { Chat } from "../ui/chat";

type ChatDemoProps = {
  currentChatId: string | null;
  initialMessages?: UseChatOptions["initialMessages"];
};

export function ChatHistory({ currentChatId }: ChatDemoProps) {
  const { data: messages } = useGetChatById(currentChatId || "");

  return (
    <div
      className={cn(
        "flex justify-between z-[1000] bg-white text-[20px]",
        "flex-col",
        "h-[80vh]",
        "w-[100%]"
      )}
    >
      {messages ? (
        <Chat
          suggestions={[]}
          handleSubmit={() => {}}
          input=""
          handleInputChange={() => {}}
          isGenerating={false}
          append={() => {}}
          className="grow"
          messages={messages.map(({ id, content, role }) => ({
            id,
            content,
            role,
          }))}
        />
      ) : (
        <h1>Чат не выбран</h1>
      )}
    </div>
  );
}
