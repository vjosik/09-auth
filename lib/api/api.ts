import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

const PUBLIC_URL = process.env.NEXT_PUBLIC_API_URL;

export const nextServer = axios.create({
  baseURL: `${PUBLIC_URL}/api`,
  withCredentials: true,
});
