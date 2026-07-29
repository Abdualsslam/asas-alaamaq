"use client";

import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { inputClass } from "./AdminUi";

const actions = [
  { label: "H2", before: "## ", after: "" },
  { label: "H3", before: "### ", after: "" },
  { label: "عريض", before: "**", after: "**" },
  { label: "مائل", before: "_", after: "_" },
  { label: "رابط", before: "[", after: "](https://)" },
  { label: "قائمة", before: "- ", after: "" },
  { label: "قائمة رقمية", before: "1. ", after: "" },
  { label: "اقتباس", before: "> ", after: "" },
  { label: "كود", before: "`", after: "`" },
  { label: "كتلة كود", before: "```\n", after: "\n```" },
  { label: "صورة", before: "![وصف الصورة](", after: ")" },
] as const;

export function MarkdownEditor({
  id,
  value,
  onChange,
  required,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [preview, setPreview] = useState(false);

  const apply = (before: string, after: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end);
    const next = `${value.slice(0, start)}${before}${selected}${after}${value.slice(
      end,
    )}`;
    onChange(next);
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selected.length,
      );
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white">
      <div className="flex flex-wrap gap-1 border-b border-border bg-[#f8f6f2] p-2">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() => apply(action.before, action.after)}
            className="rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs font-bold hover:border-earth-brown hover:text-earth-brown"
          >
            {action.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setPreview((current) => !current)}
          className="mr-auto rounded-lg bg-charcoal px-3 py-1.5 text-xs font-bold text-white"
        >
          {preview ? "التحرير" : "معاينة"}
        </button>
      </div>
      {preview ? (
        <article className="prose prose-sm min-h-64 max-w-none p-5" dir="auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
        </article>
      ) : (
        <textarea
          ref={textareaRef}
          id={id}
          required={required}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClass} min-h-72 resize-y rounded-none border-0 font-mono leading-7 focus:ring-0`}
          dir="auto"
        />
      )}
    </div>
  );
}
