import CreateEventForm from "@/components/shared/CreateEventForm";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetEvents } from "@/services/Analytics/Analytics";

const CreateEventPage = () => {
  const {data} = useGetEvents()
  return (
    <Container className="flex items-center justify-between h-full">
      <CreateEventForm />
      <div className="h-[90vh] rounded-md border p-3">
      {data?.map(event=> ( 
        <div className="flex gap-4 p-4 flex-col items-center justify-center aspect-square  ">
            <img
                className="rounded w-full h-auto max-md:w-[90%] object-cover"
                      src={event.image_url}
                    />
                    <span className="text-xl font-semibold">{event.title}</span>
                    <span className="font-base text-black">
                      {event.description}
                    </span>
                    <Button>Записаться</Button>
                  </div>) )}
      </div>
    </Container>
  );
};

export default CreateEventPage;
