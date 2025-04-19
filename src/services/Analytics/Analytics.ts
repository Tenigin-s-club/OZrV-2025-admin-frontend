import { baseApi } from "../BaseApi";
import {
  Analitica,
  MeetingStatistic,
  Event
} from "./types";

export const employeesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query<Analitica[], void>({
      query: () => `/statistics`,
      providesTags: ["Analytics"],
    }),
    useGetEvents: builder.query<Event[], void>({
      query: () => '/event',
    }),

    getMeetingStatistic: builder.query<MeetingStatistic[], string>({
      query: (id) => `/analytics/result/${id}`,
    }),
  }),
});

export const {
  useGetAnalyticsQuery: useGetAnalytics ,
  useUseGetEventsQuery: useGetEvents,
  useGetMeetingStatisticQuery: useGetMeetingStatistic,
} = employeesApi;
