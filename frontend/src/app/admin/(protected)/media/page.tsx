"use client";

import Image from "next/image";
import { FileText, Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  deleteMedia,
  getMedia,
  updateMedia,
  uploadMedia,
} from "@/lib/api/admin-api";
import { getErrorMessage } from "@/lib/api/api-error";
import type { MediaRecord } from "@/lib/api/types";
import {
  AdminLoading,
  AdminNotice,
  AdminPageHeader,
  inputClass,
  labelClass,
} from "@/components/admin/AdminUi";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function MediaPage() {
  const [items, setItems] = useState<MediaRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = useCallback(async () => {
    try {
      setItems((await getMedia({ limit: 100 })).data);
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    void getMedia({ limit: 100 })
      .then((response) => {
        if (active) setItems(response.data);
      })
      .catch((caught) => {
        if (active) setError(getErrorMessage(caught));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const upload = async (file?: File) => {
    if (!file) return;
    setWorkingId("upload");
    setError("");
    setSuccess("");
    try {
      await uploadMedia(file);
      setSuccess("تم رفع الملف إلى مكتبة الوسائط.");
      await load();
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setWorkingId("");
    }
  };

  const saveAlt = async (item: MediaRecord) => {
    setWorkingId(item.id);
    setError("");
    setSuccess("");
    try {
      const updated = await updateMedia(item.id, {
        altAr: item.altAr,
        altEn: item.altEn,
      });
      setItems((current) =>
        current.map((record) => (record.id === updated.id ? updated : record)),
      );
      setSuccess("تم تحديث النص البديل.");
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setWorkingId("");
    }
  };

  const remove = async (item: MediaRecord) => {
    if (!window.confirm(`هل تريد حذف ${item.originalFileName}؟`)) return;
    setWorkingId(item.id);
    setError("");
    setSuccess("");
    try {
      await deleteMedia(item.id);
      setItems((current) => current.filter((record) => record.id !== item.id));
      setSuccess("تم حذف الملف من R2 وقاعدة البيانات.");
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setWorkingId("");
    }
  };

  const setAlt = (id: string, key: "altAr" | "altEn", value: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    );
  };

  return (
    <>
      <AdminPageHeader
        title="مكتبة الوسائط"
        description="الصور وملفات PDF محفوظة في R2، وقاعدة البيانات تحتفظ بالبيانات الوصفية."
        action={
          <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-earth-brown px-5 py-2.5 text-sm font-bold text-white">
            <Upload size={17} />
            {workingId === "upload" ? "جاري الرفع..." : "رفع ملف"}
            <input
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/webp,image/avif,application/pdf"
              disabled={workingId === "upload"}
              onChange={(event) => void upload(event.target.files?.[0])}
            />
          </label>
        }
      />
      {success ? <AdminNotice type="success">{success}</AdminNotice> : null}
      {error ? <AdminNotice type="error">{error}</AdminNotice> : null}
      {loading ? <AdminLoading /> : null}
      {!loading ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-border bg-white"
            >
              <div className="relative flex aspect-[4/3] items-center justify-center bg-[#ebe7e0]">
                {item.mimeType.startsWith("image/") ? (
                  <Image
                    src={item.publicUrl}
                    alt={item.altAr || item.originalFileName}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                ) : (
                  <FileText size={58} className="text-earth-brown" />
                )}
              </div>
              <div className="space-y-4 p-4">
                <div>
                  <p
                    className="truncate text-sm font-bold"
                    title={item.originalFileName}
                    dir="auto"
                  >
                    {item.originalFileName}
                  </p>
                  <p className="mt-1 text-xs text-concrete-gray" dir="ltr">
                    {item.mimeType} · {formatBytes(item.size)}
                  </p>
                </div>
                <div>
                  <label htmlFor={`altAr-${item.id}`} className={labelClass}>
                    النص البديل بالعربية
                  </label>
                  <input
                    id={`altAr-${item.id}`}
                    value={item.altAr ?? ""}
                    onChange={(event) =>
                      setAlt(item.id, "altAr", event.target.value)
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor={`altEn-${item.id}`} className={labelClass}>
                    النص البديل بالإنجليزية
                  </label>
                  <input
                    id={`altEn-${item.id}`}
                    value={item.altEn ?? ""}
                    dir="ltr"
                    onChange={(event) =>
                      setAlt(item.id, "altEn", event.target.value)
                    }
                    className={inputClass}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={workingId === item.id}
                    onClick={() => void saveAlt(item)}
                    className="flex-1 rounded-xl bg-charcoal px-3 py-2.5 text-sm font-bold text-white disabled:opacity-50"
                  >
                    حفظ النص
                  </button>
                  <button
                    type="button"
                    disabled={workingId === item.id}
                    onClick={() => void remove(item)}
                    className="rounded-xl border border-red-200 px-3 py-2.5 text-sm font-bold text-red-600 disabled:opacity-50"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </article>
          ))}
          {!items.length ? (
            <p className="col-span-full py-12 text-center text-concrete-gray">
              لا توجد وسائط.
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
