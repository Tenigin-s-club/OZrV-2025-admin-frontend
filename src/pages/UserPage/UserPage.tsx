import { ChatHistory } from "@/components/shared/ChatHistory";
import Loader from "@/components/shared/Loader/Loader";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <Container className="flex justify-between items-center flex-col">
      <h2 className="text-3xl mb-5">История запросов пользоваля: {data.fio}</h2>
      <ChatHistory />
    </Container>
  );
};

export default UserPage;
