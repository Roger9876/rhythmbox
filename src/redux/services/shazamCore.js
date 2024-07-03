import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', 'YOUR_API_KEY');
      headers.set('x-rapidapi-host', 'shazam.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => '/charts/get-top-songs-in-world' }),
  }),
});

export const {
  useGetTopChartsQuery,
} = shazamCoreApi;
