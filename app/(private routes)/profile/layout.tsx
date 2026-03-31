import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NotesHub User Profile",
  description: "Your personal profile page on NotesHub App",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}