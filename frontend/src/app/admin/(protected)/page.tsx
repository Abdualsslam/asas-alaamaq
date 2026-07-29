"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FileImage, FilePlus2, FolderPlus } from "lucide-react";
import { getMedia, getPosts, getProjects } from "@/lib/api/admin-api";
import type { PostRecord, ProjectRecord } from "@/lib/api/types";
import { getErrorMessage } from "@/lib/api/api-error";
import {
  AdminLoading,
  AdminNotice,
  AdminPageHeader,
} from "@/components/admin/AdminUi";

interface DashboardState {
  publishedPosts: number;
  draftPosts: number;
  projects: number;
  media: number;
  latestPosts: PostRecord[];
  latestProjects: ProjectRecord[];
}

export default function AdminDashboardPage() {
  const [state, setState] = useState<DashboardState | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      getPosts({ status: "published", limit: 1 }),
      getPosts({ status: "draft", limit: 1 }),
      getPosts({ limit: 5 }),
      getProjects({ limit: 5 }),
      getMedia({ limit: 1 }),
    ])
      .then(([published, draft, posts, projects, media]) => {
        setState({
          publishedPosts: published.meta.total,
          draftPosts: draft.meta.total,
          projects: projects.meta.total,
          media: media.meta.total,
          latestPosts: posts.data,
          latestProjects: projects.data,
        });
      })
      .catch((caught) => setError(getErrorMessage(caught)));
  }, []);

  return (
    <>
      <AdminPageHeader
        title="الرئيسية"
        description="ملخص سريع للمحتوى المنشور والمسودات."
      />
      {error ? <AdminNotice type="error">{error}</AdminNotice> : null}
      {!state && !error ? <AdminLoading /> : null}
      {state ? (
        <div className="space-y-8">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["المقالات المنشورة", state.publishedPosts],
              ["مسودات المقالات", state.draftPosts],
              ["المشاريع", state.projects],
              ["الوسائط", state.media],
            ].map(([label, value]) => (
              <div
                key={String(label)}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm"
              >
                <span className="text-sm text-concrete-gray">{label}</span>
                <strong className="mt-3 block text-3xl font-black text-earth-brown">
                  {value}
                </strong>
              </div>
            ))}
          </section>

          <section className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/admin/posts/new"
              className="flex items-center justify-center gap-2 rounded-2xl bg-earth-brown px-5 py-4 font-bold text-white"
            >
              <FilePlus2 size={18} /> مقال جديد
            </Link>
            <Link
              href="/admin/projects/new"
              className="flex items-center justify-center gap-2 rounded-2xl bg-charcoal px-5 py-4 font-bold text-white"
            >
              <FolderPlus size={18} /> مشروع جديد
            </Link>
            <Link
              href="/admin/media"
              className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-white px-5 py-4 font-bold text-charcoal"
            >
              <FileImage size={18} /> رفع ملف
            </Link>
          </section>

          <section className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-5">
              <h2 className="mb-4 text-lg font-black">أحدث المقالات</h2>
              <div className="space-y-3">
                {state.latestPosts.length ? (
                  state.latestPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/admin/posts/${post.id}`}
                      className="flex items-center justify-between rounded-xl bg-[#f8f6f2] px-4 py-3 text-sm"
                    >
                      <span>{post.titleAr}</span>
                      <span className="text-xs text-concrete-gray">
                        {post.status === "published" ? "منشور" : "مسودة"}
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-concrete-gray">لا توجد مقالات.</p>
                )}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5">
              <h2 className="mb-4 text-lg font-black">أحدث المشاريع</h2>
              <div className="space-y-3">
                {state.latestProjects.length ? (
                  state.latestProjects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/admin/projects/${project.id}`}
                      className="flex items-center justify-between rounded-xl bg-[#f8f6f2] px-4 py-3 text-sm"
                    >
                      <span>{project.titleAr}</span>
                      <span className="text-xs text-concrete-gray">
                        ترتيب {project.sortOrder}
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-concrete-gray">لا توجد مشاريع.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
