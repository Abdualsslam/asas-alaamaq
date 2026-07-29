"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/lib/api/admin-api";
import { ApiError, getErrorMessage } from "@/lib/api/api-error";
import { AdminLoading, AdminNotice } from "./AdminUi";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [message, setMessage] = useState("");

  const verify = useCallback(async () => {
    try {
      await getMe();
      setState("ready");
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        router.replace("/admin/login");
        return;
      }
      setMessage(getErrorMessage(error));
      setState("error");
    }
  }, [router]);

  useEffect(() => {
    let active = true;
    void getMe()
      .then(() => {
        if (active) setState("ready");
      })
      .catch((error) => {
        if (!active) return;
        if (error instanceof ApiError && error.status === 401) {
          router.replace("/admin/login");
          return;
        }
        setMessage(getErrorMessage(error));
        setState("error");
      });
    return () => {
      active = false;
    };
  }, [router]);

  if (state === "loading") {
    return (
      <div className="min-h-screen bg-[#f5f2ed] p-6">
        <AdminLoading label="جاري التحقق من الجلسة..." />
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="mx-auto max-w-lg p-6 pt-24">
        <AdminNotice type="error">{message}</AdminNotice>
        <button
          type="button"
          onClick={() => {
            setState("loading");
            void verify();
          }}
          className="mt-4 rounded-xl bg-earth-brown px-5 py-2.5 text-sm font-bold text-white"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return children;
}
