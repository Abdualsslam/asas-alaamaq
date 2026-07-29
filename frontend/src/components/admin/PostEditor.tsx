"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createPost,
  getPost,
  getPostCategories,
  updatePost,
} from "@/lib/api/admin-api";
import { getErrorMessage } from "@/lib/api/api-error";
import type {
  PostCategory,
  PostPayload,
  PublishStatus,
} from "@/lib/api/types";
import {
  AdminLoading,
  AdminNotice,
  AdminPageHeader,
  FieldError,
  inputClass,
  labelClass,
} from "./AdminUi";
import { MarkdownEditor } from "./MarkdownEditor";
import { MediaPicker } from "./MediaPicker";

const emptyForm: PostPayload = {
  titleAr: "",
  titleEn: "",
  slug: "",
  excerptAr: "",
  excerptEn: "",
  contentAr: "",
  contentEn: "",
  coverMediaId: undefined,
  categoryId: undefined,
  status: "draft",
  seo: {},
};

function referenceId(reference: { id: string } | string | undefined) {
  return typeof reference === "string" ? reference : reference?.id;
}

export function PostEditor({ id }: { id?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<PostPayload>(emptyForm);
  const [categories, setCategories] = useState<PostCategory[]>([]);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [success, setSuccess] = useState(
    searchParams.get("saved") === "1" ? "تم حفظ المقال." : "",
  );

  useEffect(() => {
    Promise.all([getPostCategories(), id ? getPost(id) : Promise.resolve(null)])
      .then(([categoryRecords, post]) => {
        setCategories(categoryRecords);
        if (post) {
          setForm({
            titleAr: post.titleAr,
            titleEn: post.titleEn ?? "",
            slug: post.slug,
            excerptAr: post.excerptAr,
            excerptEn: post.excerptEn ?? "",
            contentAr: post.contentAr,
            contentEn: post.contentEn ?? "",
            coverMediaId: referenceId(post.coverMediaId),
            categoryId: referenceId(post.categoryId),
            status: post.status,
            seo: { ...post.seo },
          });
        }
      })
      .catch((caught) => setError(caught))
      .finally(() => setLoading(false));
  }, [id]);

  const set = <K extends keyof PostPayload>(key: K, value: PostPayload[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const setSeo = (key: keyof NonNullable<PostPayload["seo"]>, value: string) => {
    setForm((current) => ({
      ...current,
      seo: { ...(current.seo ?? {}), [key]: value },
    }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess("");
    try {
      const payload: PostPayload = {
        ...form,
        titleEn: form.titleEn?.trim() || undefined,
        excerptEn: form.excerptEn?.trim() || undefined,
        contentEn: form.contentEn?.trim() || undefined,
        coverMediaId: form.coverMediaId || undefined,
        categoryId: form.categoryId || undefined,
      };
      if (id) {
        await updatePost(id, payload);
        setSuccess("تم حفظ المقال وتحديث بياناته.");
      } else {
        const created = await createPost(payload);
        router.replace(`/admin/posts/${created.id}?saved=1`);
      }
    } catch (caught) {
      setError(caught);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoading />;

  return (
    <>
      <AdminPageHeader
        title={id ? "تعديل المقال" : "مقال جديد"}
        description="يُحفظ المحتوى بصيغة Markdown ويظهر المنشور العام من الخادم."
      />
      <form onSubmit={submit} className="space-y-6">
        {success ? <AdminNotice type="success">{success}</AdminNotice> : null}
        {error ? (
          <AdminNotice type="error">{getErrorMessage(error)}</AdminNotice>
        ) : null}

        <section className="grid gap-5 rounded-2xl border border-border bg-white p-5 md:grid-cols-2">
          <div>
            <label htmlFor="titleAr" className={labelClass}>
              العنوان بالعربية *
            </label>
            <input
              id="titleAr"
              required
              value={form.titleAr}
              onChange={(event) => set("titleAr", event.target.value)}
              className={inputClass}
            />
            <FieldError error={error} field="titleAr" />
          </div>
          <div>
            <label htmlFor="titleEn" className={labelClass}>
              العنوان بالإنجليزية
            </label>
            <input
              id="titleEn"
              dir="ltr"
              value={form.titleEn}
              onChange={(event) => set("titleEn", event.target.value)}
              className={inputClass}
            />
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
              value={form.slug}
              onChange={(event) => set("slug", event.target.value)}
              className={inputClass}
            />
            <FieldError error={error} field="slug" />
          </div>
          <div>
            <label htmlFor="categoryId" className={labelClass}>
              التصنيف
            </label>
            <select
              id="categoryId"
              value={form.categoryId ?? ""}
              onChange={(event) => set("categoryId", event.target.value)}
              className={inputClass}
            >
              <option value="">بدون تصنيف</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nameAr}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status" className={labelClass}>
              الحالة
            </label>
            <select
              id="status"
              value={form.status}
              onChange={(event) =>
                set("status", event.target.value as PublishStatus)
              }
              className={inputClass}
            >
              <option value="draft">مسودة</option>
              <option value="published">منشور</option>
            </select>
          </div>
          <div>
            <span className={labelClass}>صورة الغلاف</span>
            <MediaPicker
              selectedIds={form.coverMediaId ? [form.coverMediaId] : []}
              onChange={(ids) => set("coverMediaId", ids[0])}
            />
          </div>
        </section>

        <section className="grid gap-5 rounded-2xl border border-border bg-white p-5 md:grid-cols-2">
          <div>
            <label htmlFor="excerptAr" className={labelClass}>
              الملخص بالعربية {form.status === "published" ? "*" : ""}
            </label>
            <textarea
              id="excerptAr"
              required={form.status === "published"}
              value={form.excerptAr}
              onChange={(event) => set("excerptAr", event.target.value)}
              className={`${inputClass} min-h-28`}
            />
            <FieldError error={error} field="excerptAr" />
          </div>
          <div>
            <label htmlFor="excerptEn" className={labelClass}>
              الملخص بالإنجليزية
            </label>
            <textarea
              id="excerptEn"
              dir="ltr"
              value={form.excerptEn}
              onChange={(event) => set("excerptEn", event.target.value)}
              className={`${inputClass} min-h-28`}
            />
          </div>
        </section>

        <section className="space-y-6 rounded-2xl border border-border bg-white p-5">
          <div>
            <label htmlFor="contentAr" className={labelClass}>
              المحتوى بالعربية {form.status === "published" ? "*" : ""}
            </label>
            <MarkdownEditor
              id="contentAr"
              required={form.status === "published"}
              value={form.contentAr ?? ""}
              onChange={(value) => set("contentAr", value)}
            />
            <FieldError error={error} field="contentAr" />
          </div>
          <div>
            <label htmlFor="contentEn" className={labelClass}>
              المحتوى بالإنجليزية
            </label>
            <MarkdownEditor
              id="contentEn"
              value={form.contentEn ?? ""}
              onChange={(value) => set("contentEn", value)}
            />
          </div>
        </section>

        <section className="grid gap-5 rounded-2xl border border-border bg-white p-5 md:grid-cols-2">
          {(
            [
              ["metaTitleAr", "عنوان SEO بالعربية", "rtl"],
              ["metaTitleEn", "عنوان SEO بالإنجليزية", "ltr"],
              ["metaDescriptionAr", "وصف SEO بالعربية", "rtl"],
              ["metaDescriptionEn", "وصف SEO بالإنجليزية", "ltr"],
            ] as const
          ).map(([key, label, dir]) => (
            <div key={key}>
              <label htmlFor={key} className={labelClass}>
                {label}
              </label>
              <input
                id={key}
                dir={dir}
                value={form.seo?.[key] ?? ""}
                onChange={(event) => setSeo(key, event.target.value)}
                className={inputClass}
              />
              <FieldError error={error} field={`seo.${key}`} />
            </div>
          ))}
        </section>

        <div className="sticky bottom-3 z-20 flex justify-end rounded-2xl border border-border bg-white/95 p-4 shadow-lg backdrop-blur">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-earth-brown px-7 py-3 font-bold text-white disabled:opacity-60"
          >
            {saving ? "جاري الحفظ..." : "حفظ المقال"}
          </button>
        </div>
      </form>
    </>
  );
}
