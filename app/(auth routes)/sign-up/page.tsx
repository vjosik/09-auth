'use client';

import css from "./SignUpPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { register } from "@/lib/api/clientApi";
import { ApiError } from "@/lib/api/api";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const user = await register({ email, password });
      if (user) {
        router.push("/");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      const err = error as ApiError;
      setError(err.response?.data.error ?? err.message);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
