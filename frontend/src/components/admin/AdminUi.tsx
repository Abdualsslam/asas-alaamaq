import { ApiError } from "@/lib/api/api-error";

export const inputClass =
  "w-full rounded-xl border border-border bg-white px-3.5 py-2.5 text-sm text-charcoal outline-none transition focus:border-earth-brown focus:ring-2 focus:ring-earth-brown/10 disabled:bg-gray-100";

export const labelClass = "mb-1.5 block text-sm font-bold text-charcoal";

export function AdminNotice({
  type,
  children,
}: {
  type: "success" | "error" | "info";
  children: React.ReactNode;
}) {
  const styles = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    error: "border-red-200 bg-red-50 text-red-800",
    info: "border-blue-200 bg-blue-50 text-blue-800",
  };
  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${styles[type]}`}>
      {children}
    </div>
  );
}

export function FieldError({
  error,
  field,
}: {
  error: unknown;
  field: string;
}) {
  if (!(error instanceof ApiError)) return null;
  const message = error.fieldErrors.find((item) => item.field === field)?.message;
  return message ? <p className="mt-1 text-xs text-red-600">{message}</p> : null;
}

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-black text-charcoal md:text-3xl">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-concrete-gray">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function AdminLoading({ label = "جاري التحميل..." }: { label?: string }) {
  return (
    <div className="flex min-h-48 items-center justify-center text-sm text-concrete-gray">
      <span className="ml-3 h-5 w-5 animate-spin rounded-full border-2 border-earth-brown/25 border-t-earth-brown" />
      {label}
    </div>
  );
}
