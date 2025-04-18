import { Message, useChat, type UseChatOptions } from "@ai-sdk/react";
import { cn } from "@/lib/utils";

import { Chat } from "../ui/chat";

type ChatDemoProps = {
  initialMessages?: UseChatOptions["initialMessages"];
};

export function ChatHistory(props: ChatDemoProps) {
  const messages: Message[] = [
    {
      id: "1",
      content: "Привет! Ты можешь помочь мне с планированием дня?",
      role: "user",
    },
    {
      id: "2",
      content:
        "Конечно! Что у вас запланировано? Могу помочь распределить задачи или напомнить о важных событиях.",
      role: "data",
    },
    {
      id: "3",
      content:
        "Сегодня нужно сходить в магазин, подготовить отчёт и позвонить другу. Как лучше всё успеть?",
      role: "user",
    },
    {
      id: "4",
      content: `Предлагаю такой вариант:
Утро – позвоните другу (это займёт немного времени).
День – сходите в магазин, пока там меньше людей.
Вечер – займитесь отчётом, когда будет меньше отвлекающих факторов.
Как вам такой план?`,
      role: "data",
    },
    {
      id: "3",
      content: "Отлично! А можешь напомнить мне про звонок в 11:00?",
      role: "user",
    },
    {
      id: "4",
      content:
        'Конечно! Напоминаю: "Позвонить другу" в 11:00. Установил уведомление. Удачного дня!',
      role: "data",
    },
    {
      id: "1",
      content: "Привет! Ты можешь помочь мне с планированием дня?",
      role: "user",
    },
  ];

  return (
    <div
      className={cn(
        "flex justify-between z-[1000] bg-white text-[20px]",
        "flex-col",
        "h-[75vh]",
        "w-[60%] max-lg:w-[80%] max-md:w-[100%]"
      )}
    >
      <Chat className="grow" messages={messages} />
    </div>
  );
}
