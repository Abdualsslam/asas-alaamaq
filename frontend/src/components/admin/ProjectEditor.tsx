"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createProject,
  getProject,
  getProjectCategories,
  updateProject,
} from "@/lib/api/admin-api";
import { getErrorMessage } from "@/lib/api/api-error";
import type {
  ProjectCategory,
  ProjectPayload,
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
import { MediaPicker } from "./MediaPicker";

const emptyForm: ProjectPayload = {
  titleAr: "",
  titleEn: "",
  slug: "",
  descriptionAr: "",
  descriptionEn: "",
  coverMediaId: "",
  galleryMediaIds: [],
  categoryId: "",
  locationAr: "",
  locationEn: "",
  status: "draft",
  sortOrder: 0,
  detailEnabled: false,
  seo: {},
};

function referenceId(reference: { id: string } | string | undefined) {
  return typeof reference === "string" ? reference : reference?.id;
}

export function ProjectEditor({ id }: { id?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState<ProjectPayload>(emptyForm);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [success, setSuccess] = useState(
    searchParams.get("saved") === "1" ? "تم حفظ المشروع." : "",
  );

  useEffect(() => {
    Promise.all([
      getProjectCategories(),
      id ? getProject(id) : Promise.resolve(null),
    ])
      .then(([categoryRecords, project]) => {
        setCategories(categoryRecords);
        if (project) {
          setForm({
            titleAr: project.titleAr,
            titleEn: project.titleEn ?? "",
            slug: project.slug,
            descriptionAr: project.descriptionAr ?? "",
            descriptionEn: project.descriptionEn ?? "",
            coverMediaId: referenceId(project.coverMediaId) ?? "",
            galleryMediaIds: project.galleryMediaIds
              .map(referenceId)
              .filter((value): value is string => Boolean(value)),
            categoryId: referenceId(project.categoryId) ?? "",
            locationAr: project.locationAr ?? "",
            locationEn: project.locationEn ?? "",
            status: project.status,
            sortOrder: project.sortOrder,
            detailEnabled: project.detailEnabled,
            seo: { ...project.seo },
          });
        }
      })
      .catch((caught) => setError(caught))
      .finally(() => setLoading(false));
  }, [id]);

  const set = <K extends keyof ProjectPayload>(
    key: K,
    value: ProjectPayload[K],
  ) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const setSeo = (
    key: keyof NonNullable<ProjectPayload["seo"]>,
    value: string,
  ) => {
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
      const payload: ProjectPayload = {
        ...form,
        titleEn: form.titleEn?.trim() || undefined,
        descriptionAr: form.descriptionAr?.trim() || undefined,
        descriptionEn: form.descriptionEn?.trim() || undefined,
        locationAr: form.locationAr?.trim() || undefined,
        locationEn: form.locationEn?.trim() || undefined,
      };
      if (id) {
        await updateProject(id, payload);
        setSuccess("تم حفظ المشروع وتحديث بياناته.");
      } else {
        const created = await createProject(payload);
        router.replace(`/admin/projects/${created.id}?saved=1`);
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
        title={id ? "تعديل المشروع" : "مشروع جديد"}
        description="المشاريع القديمة تبقى بدون صفحة تفاصيل حتى تفعيلها صراحة."
      />
      <form onSubmit={submit} className="space-y-6">
        {success ? <AdminNotice type="success">{success}</AdminNotice> : null}
        {error ? (
          <AdminNotice type="error">{getErrorMessage(error)}</AdminNotice>
        ) : null}

        <section className="grid gap-5 rounded-2xl border border-border bg-white p-5 md:grid-cols-2">
          <div>
            <label htmlFor="projectTitleAr" className={labelClass}>
              العنوان بالعربية *
            </label>
            <input
              id="projectTitleAr"
              required
              value={form.titleAr}
              onChange={(event) => set("titleAr", event.target.value)}
              className={inputClass}
            />
            <FieldError error={error} field="titleAr" />
          </div>
          <div>
            <label htmlFor="projectTitleEn" className={labelClass}>
              العنوان بالإنجليزية
            </label>
            <input
              id="projectTitleEn"
              dir="ltr"
              value={form.titleEn}
              onChange={(event) => set("titleEn", event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="projectSlug" className={labelClass}>
              Slug *
            </label>
            <input
              id="projectSlug"
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
            <label htmlFor="projectCategory" className={labelClass}>
              التصنيف *
            </label>
            <select
              id="projectCategory"
              required
              value={form.categoryId}
              onChange={(event) => set("categoryId", event.target.value)}
              className={inputClass}
            >
              <option value="">اختر التصنيف</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nameAr}
                </option>
              ))}
            </select>
            <FieldError error={error} field="categoryId" />
          </div>
          <div>
            <label htmlFor="projectStatus" className={labelClass}>
              الحالة
            </label>
            <select
              id="projectStatus"
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
            <label htmlFor="sortOrder" className={labelClass}>
              ترتيب العرض *
            </label>
            <input
              id="sortOrder"
              type="number"
              required
              value={form.sortOrder}
              onChange={(event) => set("sortOrder", Number(event.target.value))}
              className={inputClass}
            />
            <FieldError error={error} field="sortOrder" />
          </div>
          <label className="flex items-center gap-3 rounded-xl border border-border p-4">
            <input
              type="checkbox"
              checked={Boolean(form.detailEnabled)}
              onChange={(event) => set("detailEnabled", event.target.checked)}
              className="h-5 w-5 accent-earth-brown"
            />
            <span>
              <strong className="block text-sm">تفعيل صفحة التفاصيل</strong>
              <span className="text-xs text-concrete-gray">
                لن يظهر الرابط العام ما لم يكن المشروع منشورًا أيضًا.
              </span>
            </span>
          </label>
        </section>

        <section className="grid gap-5 rounded-2xl border border-border bg-white p-5 md:grid-cols-2">
          <div>
            <label htmlFor="descriptionAr" className={labelClass}>
              الوصف بالعربية
            </label>
            <textarea
              id="descriptionAr"
              value={form.descriptionAr}
              onChange={(event) => set("descriptionAr", event.target.value)}
              className={`${inputClass} min-h-32`}
            />
          </div>
          <div>
            <label htmlFor="descriptionEn" className={labelClass}>
              الوصف بالإنجليزية
            </label>
            <textarea
              id="descriptionEn"
              dir="ltr"
              value={form.descriptionEn}
              onChange={(event) => set("descriptionEn", event.target.value)}
              className={`${inputClass} min-h-32`}
            />
          </div>
          <div>
            <label htmlFor="locationAr" className={labelClass}>
              الموقع بالعربية
            </label>
            <input
              id="locationAr"
              value={form.locationAr}
              onChange={(event) => set("locationAr", event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="locationEn" className={labelClass}>
              الموقع بالإنجليزية
            </label>
            <input
              id="locationEn"
              dir="ltr"
              value={form.locationEn}
              onChange={(event) => set("locationEn", event.target.value)}
              className={inputClass}
            />
          </div>
        </section>

        <section className="space-y-5 rounded-2xl border border-border bg-white p-5">
          <div>
            <span className={labelClass}>صورة الغلاف *</span>
            <MediaPicker
              selectedIds={form.coverMediaId ? [form.coverMediaId] : []}
              onChange={(ids) => set("coverMediaId", ids[0] ?? "")}
            />
            <FieldError error={error} field="coverMediaId" />
          </div>
          <div>
            <span className={labelClass}>معرض المشروع</span>
            <MediaPicker
              multiple
              selectedIds={form.galleryMediaIds ?? []}
              onChange={(ids) => set("galleryMediaIds", ids)}
            />
            <FieldError error={error} field="galleryMediaIds" />
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
              <label htmlFor={`project-${key}`} className={labelClass}>
                {label}
              </label>
              <input
                id={`project-${key}`}
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
            {saving ? "جاري الحفظ..." : "حفظ المشروع"}
          </button>
        </div>
      </form>
    </>
  );
}
