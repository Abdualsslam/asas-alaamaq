import { parseApiResponse } from "./api-error";
import { getApiBaseUrl } from "./public-api";
import type {
  AdminRecord,
  ApiEnvelope,
  CategoryPayload,
  MediaRecord,
  PaginatedResponse,
  PostCategory,
  PostPayload,
  PostRecord,
  ProjectCategory,
  ProjectCategoryPayload,
  ProjectPayload,
  ProjectRecord,
  PublishStatus,
  SettingsPayload,
  SettingsRecord,
} from "./types";

function adminRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  headers.set("Accept", "application/json");
  return fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers,
    credentials: "include",
    cache: "no-store",
  }).then(parseApiResponse<T>);
}

function query(values: Record<string, string | number | undefined>) {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== "") params.set(key, String(value));
  });
  const result = params.toString();
  return result ? `?${result}` : "";
}

export async function login(email: string, password: string) {
  return (
    await adminRequest<ApiEnvelope<AdminRecord>>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  ).data;
}

export async function logout() {
  return (
    await adminRequest<ApiEnvelope<{ loggedOut: boolean }>>("/auth/logout", {
      method: "POST",
    })
  ).data;
}

export async function getMe() {
  return (await adminRequest<ApiEnvelope<AdminRecord>>("/auth/me")).data;
}

export function getPosts(options: {
  page?: number;
  limit?: number;
  status?: PublishStatus;
} = {}) {
  return adminRequest<PaginatedResponse<PostRecord>>(
    `/admin/posts${query(options)}`,
  );
}

export async function createPost(payload: PostPayload) {
  return (
    await adminRequest<ApiEnvelope<PostRecord>>("/admin/posts", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  ).data;
}

export async function getPost(id: string) {
  return (
    await adminRequest<ApiEnvelope<PostRecord>>(
      `/admin/posts/${encodeURIComponent(id)}`,
    )
  ).data;
}

export async function updatePost(id: string, payload: Partial<PostPayload>) {
  return (
    await adminRequest<ApiEnvelope<PostRecord>>(
      `/admin/posts/${encodeURIComponent(id)}`,
      { method: "PATCH", body: JSON.stringify(payload) },
    )
  ).data;
}

export async function deletePost(id: string) {
  return (
    await adminRequest<ApiEnvelope<{ deleted: boolean }>>(
      `/admin/posts/${encodeURIComponent(id)}`,
      { method: "DELETE" },
    )
  ).data;
}

export async function getPostCategories() {
  return (
    await adminRequest<ApiEnvelope<PostCategory[]>>("/admin/post-categories")
  ).data;
}

export async function createPostCategory(payload: CategoryPayload) {
  return (
    await adminRequest<ApiEnvelope<PostCategory>>("/admin/post-categories", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  ).data;
}

export async function updatePostCategory(
  id: string,
  payload: Partial<CategoryPayload>,
) {
  return (
    await adminRequest<ApiEnvelope<PostCategory>>(
      `/admin/post-categories/${encodeURIComponent(id)}`,
      { method: "PATCH", body: JSON.stringify(payload) },
    )
  ).data;
}

export async function deletePostCategory(id: string) {
  return (
    await adminRequest<ApiEnvelope<{ deleted: boolean }>>(
      `/admin/post-categories/${encodeURIComponent(id)}`,
      { method: "DELETE" },
    )
  ).data;
}

export function getProjects(options: {
  page?: number;
  limit?: number;
  status?: PublishStatus;
} = {}) {
  return adminRequest<PaginatedResponse<ProjectRecord>>(
    `/admin/projects${query(options)}`,
  );
}

export async function createProject(payload: ProjectPayload) {
  return (
    await adminRequest<ApiEnvelope<ProjectRecord>>("/admin/projects", {
      method: "POST",
      body: JSON.stringify(payload),
    })
  ).data;
}

export async function getProject(id: string) {
  return (
    await adminRequest<ApiEnvelope<ProjectRecord>>(
      `/admin/projects/${encodeURIComponent(id)}`,
    )
  ).data;
}

export async function updateProject(
  id: string,
  payload: Partial<ProjectPayload>,
) {
  return (
    await adminRequest<ApiEnvelope<ProjectRecord>>(
      `/admin/projects/${encodeURIComponent(id)}`,
      { method: "PATCH", body: JSON.stringify(payload) },
    )
  ).data;
}

export async function deleteProject(id: string) {
  return (
    await adminRequest<ApiEnvelope<{ deleted: boolean }>>(
      `/admin/projects/${encodeURIComponent(id)}`,
      { method: "DELETE" },
    )
  ).data;
}

export async function getProjectCategories() {
  return (
    await adminRequest<ApiEnvelope<ProjectCategory[]>>(
      "/admin/project-categories",
    )
  ).data;
}

export async function createProjectCategory(
  payload: ProjectCategoryPayload,
) {
  return (
    await adminRequest<ApiEnvelope<ProjectCategory>>(
      "/admin/project-categories",
      { method: "POST", body: JSON.stringify(payload) },
    )
  ).data;
}

export async function updateProjectCategory(
  id: string,
  payload: Partial<ProjectCategoryPayload>,
) {
  return (
    await adminRequest<ApiEnvelope<ProjectCategory>>(
      `/admin/project-categories/${encodeURIComponent(id)}`,
      { method: "PATCH", body: JSON.stringify(payload) },
    )
  ).data;
}

export async function deleteProjectCategory(id: string) {
  return (
    await adminRequest<ApiEnvelope<{ deleted: boolean }>>(
      `/admin/project-categories/${encodeURIComponent(id)}`,
      { method: "DELETE" },
    )
  ).data;
}

export function getMedia(options: { page?: number; limit?: number } = {}) {
  return adminRequest<PaginatedResponse<MediaRecord>>(
    `/admin/media${query(options)}`,
  );
}

export async function uploadMedia(file: File) {
  const form = new FormData();
  form.append("file", file);
  return (
    await adminRequest<ApiEnvelope<MediaRecord>>("/admin/media", {
      method: "POST",
      body: form,
    })
  ).data;
}

export async function updateMedia(
  id: string,
  payload: { altAr?: string; altEn?: string },
) {
  return (
    await adminRequest<ApiEnvelope<MediaRecord>>(
      `/admin/media/${encodeURIComponent(id)}`,
      { method: "PATCH", body: JSON.stringify(payload) },
    )
  ).data;
}

export async function deleteMedia(id: string) {
  return (
    await adminRequest<ApiEnvelope<{ deleted: boolean }>>(
      `/admin/media/${encodeURIComponent(id)}`,
      { method: "DELETE" },
    )
  ).data;
}

export async function getSettings() {
  return (
    await adminRequest<ApiEnvelope<SettingsRecord>>("/admin/settings")
  ).data;
}

export async function updateSettings(payload: SettingsPayload) {
  return (
    await adminRequest<ApiEnvelope<SettingsRecord>>("/admin/settings", {
      method: "PATCH",
      body: JSON.stringify(payload),
    })
  ).data;
}
