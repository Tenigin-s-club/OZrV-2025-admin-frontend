import { Chat } from "@/types";
import { baseApi } from "../BaseApi";
import { EmployeeRole } from "./types";
import { User } from "../User/types";
import { Message } from "@/components/ui/chat-message";

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => `/auth/all`,
      providesTags: ["Employees"],
    }),
    getChats: builder.query<Chat[], string>({
      query: (userId) => `/auth/admin/chats/${userId}`,
      providesTags: ["Employees"],
    }),
    getUserById: builder.query<User, string>({
      query: (id: string) => `/auth/admin/user/${id}`,
    }),
    getChatById: builder.query<Message[], string>({
      query: (id: string) => `/auth/admin/chat/${id}`,
    }),

    confirmEmployee: builder.mutation<
      void,
      { id: string; roles: EmployeeRole[] }
    >({
      query: ({ id, roles }) => ({
        url: `/admin/confirm_user/${id}`,
        method: "POST",
        body: { roles: roles },
      }),
      invalidatesTags: ["UnVerEmployees", "Employees"],
    }),
  }),
});

export const {
  useGetChatsQuery: useGetChats,
  useGetChatByIdQuery: useGetChatById,
  useGetUserByIdQuery: useGetUserById,
  useGetUsersQuery: useGetUsers,
  useConfirmEmployeeMutation: useConfirmEmployee,
} = employeesApi;
