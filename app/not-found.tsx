import { Metadata } from "next";
import css from "./Home.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "404 - Page not found",
    description: "NotesHub App - Page Not Found",
    openGraph: {
      title: "NotesHub Not Found",
      description: "Your personal note-taking app",
      url: "https://08-zustand-sage-nine.vercel.app/not-found",
      siteName: "NotesHub App",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NotesHub App Open Graph Image",
        },
      ],
    },
  };
}

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
