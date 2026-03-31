import { Note } from "@/types/note";
import { nextServer } from "./api";
import { AxiosResponse } from "axios";
import { User } from "@/types/user";

interface CreateNoteBody {
  title: string;
  content: string;
  tag: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  tag?: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}

interface RegisterData {
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface UpdateUserData {
  username?: string;
}

//Function to fetch notes with optional filtering and pagination
export async function fetchNotes(params?: FetchNotesParams, tag?: string) {
  const { data }: AxiosResponse<FetchNotesResponse> = await nextServer.get(
    "/notes",
    {
      params,
    },
  );
  return data;
}

//Function to fetch a single note by its ID
export async function fetchNoteById(id: Note["id"]) {
  const { data }: AxiosResponse<Note> = await nextServer.get(`/notes/${id}`);
  return data;
}

//Function to create a new note
export async function createNote(body: CreateNoteBody) {
  const { data }: AxiosResponse<Note> = await nextServer.post("/notes", body);
  return data;
}

//Function to delete a note by its ID
export async function deleteNote(id: Note["id"]) {
  const { data }: AxiosResponse<Note> = await nextServer.delete(`/notes/${id}`);
  return data;
}

//Function to register a new user
export async function register(body: RegisterData) {
  const { data } = await nextServer.post<User>("/auth/register", body);
  return data;
}

//Function to log in a user
export async function login(body: LoginData) {
  const { data } = await nextServer.post<User>("/auth/login", body);
  return data;
}

//Function to log out the current user
export async function logout() {
  const { data } = await nextServer.post("/auth/logout");
  return data;
}

//Function to check if the user session is still valid
export async function checkSession() {
  const { data } = await nextServer.get("/auth/session");
  return data;
}

//Function to get the current user's profile information
export async function getMe() {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}

//Function to update the current user's profile information
export async function updateMe(updateData: UpdateUserData): Promise<User> {
  const { data } = await nextServer.patch<User>("/users/me", updateData);
  return data;
}
