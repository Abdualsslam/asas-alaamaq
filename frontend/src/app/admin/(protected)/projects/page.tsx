"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { deleteProject, getProjects } from "@/lib/api/admin-api";
import { getErrorMessage } from "@/lib/api/api-error";
import {
  populated,
  type ProjectRecord,
  type PublishStatus,
} from "@/lib/api/types";
import {
  AdminLoading,
  AdminNotice,
  AdminPageHeader,
  inputClass,
} from "@/components/admin/AdminUi";

export default function ProjectsPage() {
  const [items, setItems] = useState<ProjectRecord[]>([]);
  const [status, setStatus] = useState<PublishStatus | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = useCallback(async () => {
    try {
      setItems(
        (await getProjects({ limit: 100, status: status || undefined })).data,
      );
    } catch (caught) {
      setError(getErrorMessage(caught));
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    let active = true;
    void getProjects({ limit: 100, status: status || undefined })
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
    if (!window.confirm("هل تريد حذف هذا المشروع نهائيًا؟")) return;
    try {
      await deleteProject(id);
      setSuccess("تم حذف المشروع.");
      await load();
    } catch (caught) {
      setError(getErrorMessage(caught));
    }
  };

  return (
    <>
      <AdminPageHeader
        title="المشاريع"
        action={
          <Link
            href="/admin/projects/new"
            className="rounded-xl bg-earth-brown px-5 py-2.5 text-center text-sm font-bold text-white"
          >
            + مشروع جديد
          </Link>
        }
      />
      <div className="mb-5 flex max-w-xs items-center gap-3">
        <label htmlFor="projectFilterStatus" className="text-sm font-bold">
          الحالة
        </label>
        <select
          id="projectFilterStatus"
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
            <table className="w-full min-w-[920px] text-sm">
              <thead>
                <tr className="border-b border-border text-right text-concrete-gray">
                  <th className="p-3">الغلاف</th>
                  <th className="p-3">العنوان</th>
                  <th className="p-3">التصنيف</th>
                  <th className="p-3">الحالة</th>
                  <th className="p-3">الترتيب</th>
                  <th className="p-3">التفاصيل</th>
                  <th className="p-3">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {items.map((project) => {
                  const cover = populated(project.coverMediaId);
                  return (
                    <tr key={project.id} className="border-b border-border/70">
                      <td className="p-3">
                        {cover ? (
                          <span className="relative block h-12 w-16 overflow-hidden rounded-lg bg-gray-100">
                            <Image
                              src={cover.publicUrl}
                              alt={cover.altAr || project.titleAr}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="p-3 font-bold">{project.titleAr}</td>
                      <td className="p-3">
                        {populated(project.categoryId)?.nameAr ?? "—"}
                      </td>
                      <td className="p-3">
                        {project.status === "published" ? "منشور" : "مسودة"}
                      </td>
                      <td className="p-3">{project.sortOrder}</td>
                      <td className="p-3">
                        {project.detailEnabled ? "مفعّلة" : "غير مفعّلة"}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-3">
                          <Link
                            href={`/admin/projects/${project.id}`}
                            className="font-bold text-earth-brown"
                          >
                            تعديل
                          </Link>
                          <button
                            type="button"
                            onClick={() => void remove(project.id)}
                            className="font-bold text-red-600"
                          >
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {!items.length ? (
              <p className="p-8 text-center text-concrete-gray">
                لا توجد مشاريع.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
}
