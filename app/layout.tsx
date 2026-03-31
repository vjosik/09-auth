import Header from "@/components/Header/Header";
import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Metadata } from "next";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "NotesHub App",
    description: "Your personal note-taking app",
    openGraph: {
      title: "NotesHub App",
      description: "Your personal note-taking app",
      url: "https://noteshub-app.vercel.app/",
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

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-full flex flex-col ${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
