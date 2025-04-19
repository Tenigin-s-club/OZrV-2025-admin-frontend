import { AppSidebar } from "@/components/shared/AppSidebar";
import { ChatHistory } from "@/components/shared/ChatHistory";
import Loader from "@/components/shared/Loader/Loader";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useGetUserById, useGetChats } from "@/services/Employees/Employees";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const { data, isLoading } = useGetUserById(id);
  const { data: chats } = useGetChats(id);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const setCurrentChat = (id: string) => [setCurrentChatId(id)];

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full pt-8">
        <Loader />
      </div>
    );

  if (!data)
    return (
      <div className="flex justify-center items-center h-full pt-8 flex-col">
        <h2 className="text-xl font-medium mb-3">
          Не удалось найти сотрудника!
        </h2>
        <Button onClick={() => navigate("/")}>На главную</Button>
      </div>
    );

  return (
    <div className="flex justify-between items-center flex-col">
      <SidebarProvider
        style={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        }}
      >
        <AppSidebar setCurrentChat={setCurrentChat} items={chats || []} />
        <div className="flex flex-col gap-4 w-[100%] items-center justify-between">
          <div className="flex items-center justify-betweenb w-[100%] gap-3">
            <SidebarTrigger />
            <h2 className="font-bold text-xl">
              История запросов пользоваля: {data.fio}
            </h2>
          </div>
          <ChatHistory currentChatId={currentChatId} />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default UserPage;
