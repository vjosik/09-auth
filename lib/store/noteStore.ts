import { NoteTag } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type NoteDraft = {
  title: string;
  content: string;
  tag: NoteTag;
};

type NoteStore = {
  draft: NoteDraft;
  setDraft: (draft: NoteDraft) => void;
  clearDraft: () => void;
};

const initialDraft = {
  title: "",
  content: "",
  tag: "Todo" as NoteTag,
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    { name: "note-draft", partialize: (state) => ({ draft: state.draft }) },
  ),
);
