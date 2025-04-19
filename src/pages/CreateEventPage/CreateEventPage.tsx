import CreateEventForm from "@/components/shared/CreateEventForm";
import Container from "@/components/ui/container";
import Title from "@/components/ui/title";
import { useGetEvents } from "@/services/Analytics/Analytics";

const CreateEventPage = () => {
  const { data } = useGetEvents();
  return (
    <Container className="flex items-center md:items-start justify-between flex-col md:flex-row h-full gap-4">
      <CreateEventForm />
      <div className="flex flex-[2] flex-col gap-6">
        <Title size="sm" text={"Все события"} />
        <div className=" flex-col gap-6 md:grid md:grid-cols-2">
          {data?.map((event) => (
            <div className="flex gap-4 flex-col items-center justify-center aspect-square rounded-md border p-3 ">
              <img
                className="rounded w-full h-auto max-md:w-[90%] object-cover aspect-[16/9]"
                src={event.image_url}
              />
              <span className="text-xl font-semibold">{event.title}</span>
              <span className="font-base text-black">{event.description}</span>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CreateEventPage;
