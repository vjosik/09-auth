import { cookies } from "next/headers";
import { nextServer } from "./api";

export async function checkSession() {
  const cookieStore = await cookies();

  const { data } = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
