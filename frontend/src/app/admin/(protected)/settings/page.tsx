"use client";

import { FormEvent, useEffect, useState } from "react";
import { getSettings, updateSettings } from "@/lib/api/admin-api";
import { getErrorMessage } from "@/lib/api/api-error";
import type { SettingsPayload, SocialSetting } from "@/lib/api/types";
import {
  AdminLoading,
  AdminNotice,
  AdminPageHeader,
  FieldError,
  inputClass,
  labelClass,
} from "@/components/admin/AdminUi";
import { MediaPicker } from "@/components/admin/MediaPicker";

function referenceId(reference: { id: string } | string | undefined) {
  return typeof reference === "string" ? reference : reference?.id;
}

export default function SettingsPage() {
  const [form, setForm] = useState<SettingsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getSettings()
      .then((settings) => {
        setForm({
          phones: settings.phones.map((phone) => ({ ...phone })),
          whatsappNumber: settings.whatsappNumber,
          email: settings.email,
          website: settings.website,
          location: {
            ar: { ...settings.location.ar },
            en: { ...settings.location.en },
          },
          social: { ...settings.social },
          companyProfileMediaId: referenceId(settings.companyProfileMediaId),
          stats: settings.stats.map((stat) => ({ ...stat })),
        });
      })
      .catch((caught) => setError(caught))
      .finally(() => setLoading(false));
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form) return;
    setSaving(true);
    setError(null);
    setSuccess("");
    try {
      const social = Object.fromEntries(
        Object.entries(form.social).filter(([, value]) => value?.trim()),
      ) as SocialSetting;
      const updated = await updateSettings({
        ...form,
        social,
        companyProfileMediaId: form.companyProfileMediaId || undefined,
      });
      setForm({
        phones: updated.phones.map((phone) => ({ ...phone })),
        whatsappNumber: updated.whatsappNumber,
        email: updated.email,
        website: updated.website,
        location: {
          ar: { ...updated.location.ar },
          en: { ...updated.location.en },
        },
        social: { ...updated.social },
        companyProfileMediaId: referenceId(updated.companyProfileMediaId),
        stats: updated.stats.map((stat) => ({ ...stat })),
      });
      setSuccess("تم حفظ الإعدادات. ستظهر القيم العامة وفق دورة إعادة التحقق.");
    } catch (caught) {
      setError(caught);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoading />;
  if (!form) {
    return (
      <AdminNotice type="error">
        {error ? getErrorMessage(error) : "تعذر تحميل الإعدادات."}
      </AdminNotice>
    );
  }

  return (
    <>
      <AdminPageHeader
        title="الإعدادات"
        description="قيم الاتصال والموقع والإحصاءات وملف الشركة فقط."
      />
      <form onSubmit={submit} className="space-y-6">
        {success ? <AdminNotice type="success">{success}</AdminNotice> : null}
        {error ? (
          <AdminNotice type="error">{getErrorMessage(error)}</AdminNotice>
        ) : null}

        <section className="space-y-5 rounded-2xl border border-border bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">الاتصال</h2>
            <button
              type="button"
              onClick={() =>
                setForm((current) =>
                  current
                    ? {
                        ...current,
                        phones: [...current.phones, { display: "", raw: "" }],
                      }
                    : current,
                )
              }
              className="text-sm font-bold text-earth-brown"
            >
              + إضافة هاتف
            </button>
          </div>
          <div className="space-y-3">
            {form.phones.map((phone, index) => (
              <div
                key={`${index}-${phone.raw}`}
                className="grid gap-3 rounded-xl bg-[#f8f6f2] p-3 sm:grid-cols-[1fr_1fr_auto]"
              >
                <div>
                  <label htmlFor={`phoneDisplay-${index}`} className={labelClass}>
                    العرض
                  </label>
                  <input
                    id={`phoneDisplay-${index}`}
                    required
                    dir="ltr"
                    value={phone.display}
                    onChange={(event) =>
                      setForm((current) => {
                        if (!current) return current;
                        const phones = current.phones.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, display: event.target.value }
                            : item,
                        );
                        return { ...current, phones };
                      })
                    }
                    className={inputClass}
                  />
                  <FieldError error={error} field={`phones.${index}.display`} />
                </div>
                <div>
                  <label htmlFor={`phoneRaw-${index}`} className={labelClass}>
                    الرقم الخام
                  </label>
                  <input
                    id={`phoneRaw-${index}`}
                    required
                    dir="ltr"
                    value={phone.raw}
                    onChange={(event) =>
                      setForm((current) => {
                        if (!current) return current;
                        const phones = current.phones.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, raw: event.target.value }
                            : item,
                        );
                        return { ...current, phones };
                      })
                    }
                    className={inputClass}
                  />
                  <FieldError error={error} field={`phones.${index}.raw`} />
                </div>
                <button
                  type="button"
                  disabled={form.phones.length === 1}
                  onClick={() =>
                    setForm((current) =>
                      current
                        ? {
                            ...current,
                            phones: current.phones.filter(
                              (_, itemIndex) => itemIndex !== index,
                            ),
                          }
                        : current,
                    )
                  }
                  className="self-end rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 disabled:opacity-30"
                >
                  حذف
                </button>
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="whatsappNumber" className={labelClass}>
                واتساب *
              </label>
              <input
                id="whatsappNumber"
                required
                dir="ltr"
                value={form.whatsappNumber}
                onChange={(event) =>
                  setForm({ ...form, whatsappNumber: event.target.value })
                }
                className={inputClass}
              />
              <FieldError error={error} field="whatsappNumber" />
            </div>
            <div>
              <label htmlFor="settingsEmail" className={labelClass}>
                البريد الإلكتروني *
              </label>
              <input
                id="settingsEmail"
                type="email"
                required
                dir="ltr"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                className={inputClass}
              />
              <FieldError error={error} field="email" />
            </div>
            <div>
              <label htmlFor="website" className={labelClass}>
                الموقع *
              </label>
              <input
                id="website"
                required
                dir="ltr"
                value={form.website}
                onChange={(event) =>
                  setForm({ ...form, website: event.target.value })
                }
                className={inputClass}
              />
              <FieldError error={error} field="website" />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-white p-5">
          <h2 className="mb-5 text-lg font-black">الموقع</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {(["ar", "en"] as const).flatMap((locale) =>
              (["city", "country"] as const).map((field) => (
                <div key={`${locale}-${field}`}>
                  <label
                    htmlFor={`${locale}-${field}`}
                    className={labelClass}
                  >
                    {field === "city" ? "المدينة" : "الدولة"} —{" "}
                    {locale === "ar" ? "عربي" : "English"}
                  </label>
                  <input
                    id={`${locale}-${field}`}
                    required
                    dir={locale === "ar" ? "rtl" : "ltr"}
                    value={form.location[locale][field]}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        location: {
                          ...form.location,
                          [locale]: {
                            ...form.location[locale],
                            [field]: event.target.value,
                          },
                        },
                      })
                    }
                    className={inputClass}
                  />
                  <FieldError
                    error={error}
                    field={`location.${locale}.${field}`}
                  />
                </div>
              )),
            )}
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-border bg-white p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black">الإحصاءات</h2>
            <button
              type="button"
              onClick={() =>
                setForm({
                  ...form,
                  stats: [
                    ...form.stats,
                    {
                      key: "",
                      value: 0,
                      suffixAr: "",
                      suffixEn: "",
                      labelAr: "",
                      labelEn: "",
                      sortOrder: form.stats.length + 1,
                    },
                  ],
                })
              }
              className="text-sm font-bold text-earth-brown"
            >
              + إضافة إحصائية
            </button>
          </div>
          {form.stats.map((stat, index) => (
            <div
              key={`${stat.key}-${index}`}
              className="grid gap-3 rounded-xl bg-[#f8f6f2] p-4 sm:grid-cols-2 xl:grid-cols-4"
            >
              {(
                [
                  ["key", "المفتاح", "text", "ltr"],
                  ["value", "القيمة", "number", "ltr"],
                  ["suffixAr", "لاحقة عربي", "text", "rtl"],
                  ["suffixEn", "لاحقة EN", "text", "ltr"],
                  ["labelAr", "الوصف عربي", "text", "rtl"],
                  ["labelEn", "الوصف EN", "text", "ltr"],
                  ["sortOrder", "الترتيب", "number", "ltr"],
                ] as const
              ).map(([field, label, type, dir]) => (
                <div key={field}>
                  <label
                    htmlFor={`stat-${index}-${field}`}
                    className={labelClass}
                  >
                    {label}
                  </label>
                  <input
                    id={`stat-${index}-${field}`}
                    type={type}
                    dir={dir}
                    required={["key", "value", "labelAr", "labelEn", "sortOrder"].includes(field)}
                    value={stat[field] ?? ""}
                    onChange={(event) => {
                      const value =
                        type === "number"
                          ? Number(event.target.value)
                          : event.target.value;
                      setForm({
                        ...form,
                        stats: form.stats.map((item, itemIndex) =>
                          itemIndex === index ? { ...item, [field]: value } : item,
                        ),
                      });
                    }}
                    className={inputClass}
                  />
                  <FieldError error={error} field={`stats.${index}.${field}`} />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    stats: form.stats.filter(
                      (_, itemIndex) => itemIndex !== index,
                    ),
                  })
                }
                className="self-end rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600"
              >
                حذف الإحصائية
              </button>
            </div>
          ))}
        </section>

        <section className="grid gap-5 rounded-2xl border border-border bg-white p-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <h2 className="text-lg font-black">الشبكات الاجتماعية</h2>
          </div>
          {(["linkedin", "instagram", "x", "youtube"] as const).map((key) => (
            <div key={key}>
              <label htmlFor={key} className={labelClass}>
                {key}
              </label>
              <input
                id={key}
                type="url"
                dir="ltr"
                value={form.social[key] ?? ""}
                onChange={(event) =>
                  setForm({
                    ...form,
                    social: { ...form.social, [key]: event.target.value },
                  })
                }
                className={inputClass}
              />
              <FieldError error={error} field={`social.${key}`} />
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-border bg-white p-5">
          <h2 className="mb-2 text-lg font-black">ملف الشركة</h2>
          <p className="mb-4 text-sm text-concrete-gray">
            يقبل ملف PDF موجودًا في مكتبة الوسائط.
          </p>
          <MediaPicker
            acceptMime="application/pdf"
            selectedIds={
              form.companyProfileMediaId ? [form.companyProfileMediaId] : []
            }
            onChange={(ids) =>
              setForm({ ...form, companyProfileMediaId: ids[0] })
            }
            label="اختيار ملف PDF"
          />
          <FieldError error={error} field="companyProfileMediaId" />
        </section>

        <div className="sticky bottom-3 z-20 flex justify-end rounded-2xl border border-border bg-white/95 p-4 shadow-lg backdrop-blur">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-earth-brown px-7 py-3 font-bold text-white disabled:opacity-60"
          >
            {saving ? "جاري الحفظ..." : "حفظ الإعدادات"}
          </button>
        </div>
      </form>
    </>
  );
}
