"use client";

import Image from "next/image";
import { FileText, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getMedia, uploadMedia } from "@/lib/api/admin-api";
import { getErrorMessage } from "@/lib/api/api-error";
import type { MediaRecord } from "@/lib/api/types";
import { AdminLoading, AdminNotice } from "./AdminUi";

export function MediaPicker({
  selectedIds,
  onChange,
  multiple = false,
  acceptMime,
  label = "اختيار من مكتبة الوسائط",
}: {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  multiple?: boolean;
  acceptMime?: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<MediaRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    let active = true;
    void getMedia({ limit: 100 })
      .then((response) => {
        if (!active) return;
        setItems(
          acceptMime
            ? response.data.filter((item) => item.mimeType === acceptMime)
            : response.data,
        );
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
  }, [acceptMime, open]);

  const select = (id: string) => {
    if (!multiple) {
      onChange([id]);
      setOpen(false);
      return;
    }
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((current) => current !== id)
        : [...selectedIds, id],
    );
  };

  const handleUpload = async (file?: File) => {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const uploaded = await uploadMedia(file);
      if (!acceptMime || uploaded.mimeType === acceptMime) {
        setItems((current) => [uploaded, ...current]);
      }
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            setLoading(true);
            setError("");
            setOpen(true);
          }}
          className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-bold transition hover:border-earth-brown hover:text-earth-brown"
        >
          {label}
        </button>
        <span className="text-xs text-concrete-gray">
          {selectedIds.length
            ? `تم اختيار ${selectedIds.length}`
            : "لا يوجد ملف محدد"}
        </span>
        {selectedIds.length ? (
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-xs font-bold text-red-600"
          >
            مسح الاختيار
          </button>
        ) : null}
      </div>

      {open ? (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/65 p-3">
          <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-[#f5f2ed] shadow-2xl">
            <div className="flex items-center justify-between border-b border-border bg-white p-4">
              <div>
                <h2 className="font-black">مكتبة الوسائط</h2>
                <p className="text-xs text-concrete-gray">
                  اختر {multiple ? "ملفًا أو أكثر" : "ملفًا واحدًا"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-border p-2"
                aria-label="إغلاق"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-earth-brown px-4 py-2.5 text-sm font-bold text-white">
                <Upload size={17} />
                رفع ملف
                <input
                  type="file"
                  className="hidden"
                  accept={acceptMime}
                  onChange={(event) =>
                    void handleUpload(event.target.files?.[0])
                  }
                />
              </label>
              {multiple ? (
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-charcoal px-4 py-2.5 text-sm font-bold text-white"
                >
                  اعتماد الاختيار
                </button>
              ) : null}
            </div>
            <div className="overflow-y-auto p-4">
              {error ? <AdminNotice type="error">{error}</AdminNotice> : null}
              {loading ? <AdminLoading /> : null}
              {!loading ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {items.map((item) => {
                    const active = selectedIds.includes(item.id);
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => select(item.id)}
                        className={`overflow-hidden rounded-xl border-2 bg-white text-right transition ${
                          active
                            ? "border-earth-brown ring-2 ring-earth-brown/15"
                            : "border-transparent hover:border-earth-brown/40"
                        }`}
                      >
                        <span className="relative flex aspect-square items-center justify-center bg-[#eeeae3]">
                          {item.mimeType.startsWith("image/") ? (
                            <Image
                              src={item.publicUrl}
                              alt={item.altAr || item.originalFileName}
                              fill
                              className="object-cover"
                              sizes="180px"
                            />
                          ) : (
                            <FileText size={36} className="text-earth-brown" />
                          )}
                        </span>
                        <span
                          className="block truncate p-2 text-xs"
                          title={item.originalFileName}
                        >
                          {item.originalFileName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
              {!loading && !items.length ? (
                <p className="py-10 text-center text-sm text-concrete-gray">
                  لا توجد وسائط مطابقة.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
