import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Title from "../ui/title";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/lib/helpers/notification";
import { useCreateEvent } from "@/services/Employees/Employees";
import { DateTimePicker } from "../ui/date-time-picker";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(2, "Минимальная длина названия - 2 символа."),
  image_url: z.string().url("Должно быть ссылкой."),
  description: z.string().min(2, "Минимальная длина описания - 2 символа."),
  date_event: z.date({
    message: "Должно быть датой",
  }),
});

const CreateEventForm = () => {
  const navigate = useNavigate();
  const [createEvent] = useCreateEvent();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      image_url: "",
      description: "",
    },
  });

  async function onSubmit({
    title,
    image_url,
    description,
    date_event,
  }: z.infer<typeof formSchema>) {
    try {
      await createEvent({
        title,
        image_url,
        description,
        date_event: date_event
          .toISOString()
          .slice(0, date_event.toISOString().length - 1),
      });
      navigate("/");
      showSuccessNotification("Событие создано.");
    } catch {
      showErrorNotification("Не удалось создать событие, попробуйте еще раз.");
    }
  }
  return (
    <div className="w-96 rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col space-y-1.5 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
          <Title size="sm" text={"Создать событие"} />
          <p>
            Создайте событие, введя название, ссылку на фото, описание и дату!
          </p>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название</FormLabel>
                <FormControl>
                  <Input placeholder="Пример мероприятия" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ссылка на фото</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Описание</FormLabel>
                <FormControl>
                  <Input placeholder="Длинный текст..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date_event"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Дата мероприятия</FormLabel>
                <FormControl>
                  <DateTimePicker {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Создать событие
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateEventForm;
