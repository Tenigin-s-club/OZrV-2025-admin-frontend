import { AppSidebar } from "@/components/shared/AppSidebar";
import { ChatHistory } from "@/components/shared/ChatHistory";
import Loader from "@/components/shared/Loader/Loader";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const chats = [
  {
    id: "123-ased-q23-23-wa",
    name: "test chat 1",
    createdAt: "2025-04-18T21:55:03Z",
  },
  {
    id: "123-a-fasdq3-4--wa",
    name: "test chat 2",
    createdAt: "2025-04-16T21:55:03Z",
  },
];

const UserPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{
    fio: string;
    role: string[];
    email: string;
    percentage: number;
    wasOnEvents: Record<string, number>;
  } | null>(null);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      // get data
      // /user/${id}
      setData({
        fio: "Погосян Роман Тигранович",
        role: ["member_union", "secretar"],
        email: "tgBotyTop228@mail.her",
        percentage: 52.52,
        wasOnEvents: {
          secretar: 2,
          member_union: 14,
        },
      });
      setIsLoading(false);
    })();
  }, []);

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
          // @ts-ignore
          "--sidebar-width": "20rem",
          "--sidebar-width-mobile": "20rem",
        }}
      >
        <AppSidebar items={chats} />
        <div className="flex flex-col gap-4 w-[100%] items-center justify-between">
          <div className="flex items-center justify-betweenb w-[100%] gap-3">
            <SidebarTrigger />
            <h2 className="font-bold text-xl">
              История запросов пользоваля: {data.fio}
            </h2>
          </div>
          <ChatHistory />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default UserPage;
