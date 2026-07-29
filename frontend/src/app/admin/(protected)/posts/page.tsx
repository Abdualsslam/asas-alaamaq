"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { deletePost, getPosts } from "@/lib/api/admin-api";
import { getErrorMessage } from "@/lib/api/api-error";
import { populated, type PostRecord, type PublishStatus } from "@/lib/api/types";
import {
  AdminLoading,
  AdminNotice,
  AdminPageHeader,
  inputClass,
} from "@/components/admin/AdminUi";

export default function PostsPage() {
  const [items, setItems] = useState<PostRecord[]>([]);
  const [status, setStatus] = useState<PublishStatus | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = useCallback(async () => {
    try {
      setItems((await getPosts({ limit: 100, status: status || undefined })).data);
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    let active = true;
    void getPosts({ limit: 100, status: status || undefined })
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
  }, [status]);

  const remove = async (id: string) => {
    if (!window.confirm("هل تريد حذف هذا المقال نهائيًا؟")) return;
    try {
      await deletePost(id);
      setSuccess("تم حذف المقال.");
      await load();
    } catch (caught) {
      setError(getErrorMessage(caught));
    }
  };

  return (
    <>
      <AdminPageHeader
        title="المقالات"
        action={
          <Link
            href="/admin/posts/new"
            className="rounded-xl bg-earth-brown px-5 py-2.5 text-center text-sm font-bold text-white"
          >
            + مقال جديد
          </Link>
        }
      />
      <div className="mb-5 flex max-w-xs items-center gap-3">
        <label htmlFor="postStatus" className="text-sm font-bold">
          الحالة
        </label>
        <select
          id="postStatus"
          value={status}
          onChange={(event) => {
            setLoading(true);
            setError("");
            setStatus(event.target.value as PublishStatus | "");
          }}
          className={inputClass}
        >
          <option value="">الكل</option>
          <option value="draft">مسودة</option>
          <option value="published">منشور</option>
        </select>
      </div>
      {success ? <AdminNotice type="success">{success}</AdminNotice> : null}
      {error ? <AdminNotice type="error">{error}</AdminNotice> : null}
      <div className="mt-5 min-w-0 rounded-2xl border border-border bg-white p-4">
        {loading ? <AdminLoading /> : null}
        {!loading ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-sm">
              <thead>
                <tr className="border-b border-border text-right text-concrete-gray">
                  <th className="p-3">العنوان</th>
                  <th className="p-3">التصنيف</th>
                  <th className="p-3">الحالة</th>
                  <th className="p-3">تاريخ النشر</th>
                  <th className="p-3">آخر تحديث</th>
                  <th className="p-3">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {items.map((post) => (
                  <tr key={post.id} className="border-b border-border/70">
                    <td className="p-3 font-bold">{post.titleAr}</td>
                    <td className="p-3">
                      {populated(post.categoryId)?.nameAr ?? "—"}
                    </td>
                    <td className="p-3">
                      {post.status === "published" ? "منشور" : "مسودة"}
                    </td>
                    <td className="p-3">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("ar-SA")
                        : "—"}
                    </td>
                    <td className="p-3">
                      {new Date(post.updatedAt).toLocaleDateString("ar-SA")}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-3">
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="font-bold text-earth-brown"
                        >
                          تعديل
                        </Link>
                        <button
                          type="button"
                          onClick={() => void remove(post.id)}
                          className="font-bold text-red-600"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!items.length ? (
              <p className="p-8 text-center text-concrete-gray">
                لا توجد مقالات.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
}
