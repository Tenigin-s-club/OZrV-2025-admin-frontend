import { baseApi } from "../BaseApi";
import {
  Analitica,
  MeetingRequest,
  MeetingStatistic,
  Question,
  RequestQuestion,
} from "./types";

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query<Analitica[], void>({
      query: () => `/statistics`,
      providesTags: ["Analytics"],
    }),
    getQuestion: builder.query<Question, string>({
      query: (id) => `/analytics/questions/${id}`,
    }),
    addMeeting: builder.mutation<string, MeetingRequest>({
      query: (body) => ({
        url: "/analytics",
        method: "POST",
        body,
      }),
    }),
    addQuestion: builder.mutation<void, RequestQuestion>({
      query: (body) => ({
        url: `/analytics/${body.idMeeting}/question?title=${body.title}&description=${body.description}`,
        method: "POST",
        body: body.materials,
      }),
    }),

    getMeetingStatistic: builder.query<MeetingStatistic[], string>({
      query: (id) => `/analytics/result/${id}`,
    }),
  }),
});

export const {
  useGetAnalyticsQuery: useGetAnalytics ,
  useAddMeetingMutation: useAddMeeting,
  useAddQuestionMutation: useAddQuestionForMeeting,
  useGetQuestionQuery: useGetQuestion,
  useGetMeetingStatisticQuery: useGetMeetingStatistic,
} = employeesApi;
