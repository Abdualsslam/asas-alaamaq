"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/admin-api";
import { getErrorMessage } from "@/lib/api/api-error";
import { AdminNotice, FieldError, inputClass, labelClass } from "@/components/admin/AdminUi";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<unknown>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(email, password);
      router.replace("/admin");
    } catch (caught) {
      setError(caught);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#171717] p-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-6 shadow-2xl sm:p-9">
        <div className="mb-8 text-center">
          <Image
            src="/brand/logo.svg"
            alt="أساس الأعماق"
            width={180}
            height={55}
            className="mx-auto mb-5 h-14 w-auto"
            priority
          />
          <h1 className="text-2xl font-black">تسجيل الدخول</h1>
          <p className="mt-1 text-sm text-concrete-gray">
            لوحة إدارة محتوى أساس الأعماق
          </p>
        </div>
        <form onSubmit={submit} className="space-y-5">
          {error ? (
            <AdminNotice type="error">{getErrorMessage(error)}</AdminNotice>
          ) : null}
          <div>
            <label htmlFor="email" className={labelClass}>
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
              dir="ltr"
            />
            <FieldError error={error} field="email" />
          </div>
          <div>
            <label htmlFor="password" className={labelClass}>
              كلمة المرور
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
              dir="ltr"
            />
            <FieldError error={error} field="password" />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-earth-brown px-5 py-3 font-bold text-white transition hover:bg-earth-brown-dark disabled:opacity-60"
          >
            {submitting ? "جاري الدخول..." : "دخول"}
          </button>
        </form>
      </div>
    </main>
  );
}
