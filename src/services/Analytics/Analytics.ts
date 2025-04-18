import { baseApi } from "../BaseApi";
import {
  Meeting,
  MeetingRequest,
  MeetingStatistic,
  MeetingStatus,
  Question,
  RequestQuestion,
} from "./types";

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMeetings: builder.query<Meeting[], MeetingStatus>({
      query: (status) => `/analytics?status=${status}`,
      providesTags: ["Meetings"],
    }),
    getMeeting: builder.query<Meeting, string>({
      query: (id) => `/analytics/${id}`,
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
  useGetMeetingsQuery: useGetMeetings,
  useAddMeetingMutation: useAddMeeting,
  useGetMeetingQuery: useGetMeeting,
  useAddQuestionMutation: useAddQuestionForMeeting,
  useGetQuestionQuery: useGetQuestion,
  useGetMeetingStatisticQuery: useGetMeetingStatistic,
} = employeesApi;
