"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  createPostCategory,
  createProjectCategory,
  deletePostCategory,
  deleteProjectCategory,
  getPostCategories,
  getProjectCategories,
  updatePostCategory,
  updateProjectCategory,
} from "@/lib/api/admin-api";
import { getErrorMessage } from "@/lib/api/api-error";
import type { PostCategory, ProjectCategory } from "@/lib/api/types";
import {
  AdminLoading,
  AdminNotice,
  AdminPageHeader,
  FieldError,
  inputClass,
  labelClass,
} from "./AdminUi";

type Category = PostCategory | ProjectCategory;

export function CategoryManager({
  kind,
}: {
  kind: "posts" | "projects";
}) {
  const projectMode = kind === "projects";
  const [items, setItems] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [slug, setSlug] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [success, setSuccess] = useState("");

  const load = useCallback(async () => {
    try {
      setItems(
        projectMode
          ? await getProjectCategories()
          : await getPostCategories(),
      );
    } catch (caught) {
      setError(caught);
    } finally {
      setLoading(false);
    }
  }, [projectMode]);

  useEffect(() => {
    let active = true;
    const request = projectMode
      ? getProjectCategories()
      : getPostCategories();
    void request
      .then((records) => {
        if (active) setItems(records);
      })
      .catch((caught) => {
        if (active) setError(caught);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [projectMode]);

  const reset = () => {
    setEditingId(null);
    setNameAr("");
    setNameEn("");
    setSlug("");
    setSortOrder(0);
    setError(null);
  };

  const edit = (item: Category) => {
    setEditingId(item.id);
    setNameAr(item.nameAr);
    setNameEn(item.nameEn ?? "");
    setSlug(item.slug);
    setSortOrder("sortOrder" in item ? item.sortOrder : 0);
    setSuccess("");
    setError(null);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess("");
    try {
      if (projectMode) {
        const payload = { nameAr, nameEn, slug, sortOrder };
        if (editingId) await updateProjectCategory(editingId, payload);
        else await createProjectCategory(payload);
      } else {
        const payload = { nameAr, nameEn: nameEn || undefined, slug };
        if (editingId) await updatePostCategory(editingId, payload);
        else await createPostCategory(payload);
      }
      setSuccess(editingId ? "تم تحديث التصنيف." : "تم إنشاء التصنيف.");
      reset();
      await load();
    } catch (caught) {
      setError(caught);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("هل تريد حذف هذا التصنيف؟")) return;
    setError(null);
    setSuccess("");
    try {
      if (projectMode) await deleteProjectCategory(id);
      else await deletePostCategory(id);
      setSuccess("تم حذف التصنيف.");
      await load();
    } catch (caught) {
      setError(caught);
    }
  };

  return (
    <>
      <AdminPageHeader
        title={projectMode ? "تصنيفات المشاريع" : "تصنيفات المقالات"}
        description="إدارة الأسماء المحلية والـslug المستخدم في الروابط والفلاتر."
      />
      <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <form
          onSubmit={submit}
          className="h-fit space-y-4 rounded-2xl border border-border bg-white p-5"
        >
          <h2 className="text-lg font-black">
            {editingId ? "تعديل التصنيف" : "تصنيف جديد"}
          </h2>
          {success ? <AdminNotice type="success">{success}</AdminNotice> : null}
          {error ? (
            <AdminNotice type="error">{getErrorMessage(error)}</AdminNotice>
          ) : null}
          <div>
            <label htmlFor="nameAr" className={labelClass}>
              الاسم بالعربية *
            </label>
            <input
              id="nameAr"
              required
              value={nameAr}
              onChange={(event) => setNameAr(event.target.value)}
              className={inputClass}
            />
            <FieldError error={error} field="nameAr" />
          </div>
          <div>
            <label htmlFor="nameEn" className={labelClass}>
              الاسم بالإنجليزية {projectMode ? "*" : ""}
            </label>
            <input
              id="nameEn"
              required={projectMode}
              dir="ltr"
              value={nameEn}
              onChange={(event) => setNameEn(event.target.value)}
              className={inputClass}
            />
            <FieldError error={error} field="nameEn" />
          </div>
          <div>
            <label htmlFor="slug" className={labelClass}>
              Slug *
            </label>
            <input
              id="slug"
              required
              dir="ltr"
              pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              className={inputClass}
            />
            <FieldError error={error} field="slug" />
          </div>
          {projectMode ? (
            <div>
              <label htmlFor="sortOrder" className={labelClass}>
                الترتيب *
              </label>
              <input
                id="sortOrder"
                type="number"
                required
                value={sortOrder}
                onChange={(event) => setSortOrder(Number(event.target.value))}
                className={inputClass}
              />
              <FieldError error={error} field="sortOrder" />
            </div>
          ) : null}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-earth-brown px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60"
            >
              {saving ? "جاري الحفظ..." : editingId ? "حفظ التعديل" : "إضافة"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={reset}
                className="rounded-xl border border-border px-5 py-2.5 text-sm font-bold"
              >
                إلغاء
              </button>
            ) : null}
          </div>
        </form>

        <div className="min-w-0 rounded-2xl border border-border bg-white p-4 sm:p-5">
          {loading ? <AdminLoading /> : null}
          {!loading ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-sm">
                <thead>
                  <tr className="border-b border-border text-right text-concrete-gray">
                    <th className="p-3">العربية</th>
                    <th className="p-3">الإنجليزية</th>
                    <th className="p-3">Slug</th>
                    {projectMode ? <th className="p-3">الترتيب</th> : null}
                    <th className="p-3">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-border/70">
                      <td className="p-3 font-bold">{item.nameAr}</td>
                      <td className="p-3" dir="ltr">
                        {item.nameEn || "—"}
                      </td>
                      <td className="p-3 font-mono text-xs" dir="ltr">
                        {item.slug}
                      </td>
                      {projectMode ? (
                        <td className="p-3">
                          {"sortOrder" in item ? item.sortOrder : "—"}
                        </td>
                      ) : null}
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => edit(item)}
                            className="font-bold text-earth-brown"
                          >
                            تعديل
                          </button>
                          <button
                            type="button"
                            onClick={() => void remove(item.id)}
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
                  لا توجد تصنيفات.
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
