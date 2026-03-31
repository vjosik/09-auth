"use client";

import { fetchNotes } from "@/lib/api/clientApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./Notes.module.css";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { NoteTag } from "@/types/note";
import { useRouter } from "next/navigation";

interface NotesClientProps {
  category?: NoteTag;
}

export default function NotesClient({ category }: NotesClientProps) {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const route = useRouter();

  const { data, error, isError } = useQuery({
    queryKey: ["fetchNotes", page, search, category],
    queryFn: () => fetchNotes({ page, perPage: 12, search, tag: category }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  if (isError) throw error;

  const searchNote = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={searchNote} value={search} />
        {totalPages > 1 && (
          <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        )}
        <button
          className={css.button}
          onClick={() => route.push("/notes/action/create")}
        >
          Create note +
        </button>
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}
