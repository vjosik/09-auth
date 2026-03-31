"use client";
import { noteTags, type NoteTag } from "../../types/note";
import * as Yup from "yup";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";
import { useNoteStore } from "@/lib/store/noteStore";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface NotesFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

type NoteFormErrors = Partial<Record<keyof NotesFormValues, string>>;

const NotesSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(50, "Maximum 50 characters"),
  content: Yup.string().max(500, "Maximum content 500 characters"),
  tag: Yup.string().required().oneOf(noteTags, "Choose a valid tag value"),
});

export default function NoteForm() {
  const queryClient = useQueryClient();
  const [errors, setErrors] = useState<NoteFormErrors>({});
  const { draft, setDraft, clearDraft } = useNoteStore();

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["fetchNotes"] });
      clearDraft();
      router.back();
    },
  });

  const handelChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const handelCancel = () => {
    router.back();
  };

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tag = formData.get("tag") as NoteTag;

    const values: NotesFormValues = {
      title: typeof title === "string" ? title.trim() : "",
      content: typeof content === "string" ? content.trim() : "",
      tag:
        typeof tag === "string" && noteTags.includes(tag as NoteTag)
          ? tag
          : "Todo",
    };
    try {
      const validatedData = NotesSchema.validateSync(values, {
        abortEarly: false,
      });
      setErrors({});
      mutate({
        title: validatedData.title,
        content: validatedData.content ?? "",
        tag: validatedData.tag as NoteTag,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const nextErrors: NoteFormErrors = {};
        error.inner.forEach((err) => {
          if (err.path) {
            nextErrors[err.path as keyof NotesFormValues] = err.message;
          }
        });
        setErrors(nextErrors);
      }
    }
  };
  return (
    <form className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handelChange}
        />
        {errors.title && <p className={css.error}>{errors.title}</p>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          defaultValue={draft?.content}
          onChange={handelChange}
        ></textarea>
        {errors.content && <p className={css.error}>{errors.content}</p>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={handelChange}
        >
          <option value="">Select a tag</option>
          {noteTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        {errors.tag && <p className={css.error}>{errors.tag}</p>}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handelCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          formAction={handleSubmit}
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Create Note"}
        </button>
      </div>
    </form>
  );
}
