import axios from 'axios';
import { QueryClient } from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true
    },
  },
});

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api'
});
