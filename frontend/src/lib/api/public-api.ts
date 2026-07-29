import { parseApiResponse } from "./api-error";
import type {
  ApiEnvelope,
  PaginatedResponse,
  PostCategory,
  PostRecord,
  ProjectCategory,
  ProjectRecord,
  SettingsRecord,
} from "./types";

const PUBLIC_REVALIDATE_SECONDS = 300;

export function getApiBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!configured) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("NEXT_PUBLIC_API_URL is required in production");
    }
    return "http://localhost:4000/api";
  }
  return configured.replace(/\/+$/, "");
}

function publicRequest<T>(path: string): Promise<T> {
  return fetch(`${getApiBaseUrl()}${path}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: PUBLIC_REVALIDATE_SECONDS },
  }).then(parseApiResponse<T>);
}

function queryString(
  values: Record<string, string | number | undefined>,
): string {
  const params = new URLSearchParams();
  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== "") params.set(key, String(value));
  });
  const result = params.toString();
  return result ? `?${result}` : "";
}

export function getPublicPosts(options: {
  page?: number;
  limit?: number;
  category?: string;
} = {}): Promise<PaginatedResponse<PostRecord>> {
  return publicRequest(
    `/public/posts${queryString({
      page: options.page,
      limit: options.limit,
      category: options.category,
    })}`,
  );
}

export async function getPublicPostBySlug(slug: string): Promise<PostRecord> {
  const response = await publicRequest<ApiEnvelope<PostRecord>>(
    `/public/posts/${encodeURIComponent(slug)}`,
  );
  return response.data;
}

export async function getPublicPostCategories(): Promise<PostCategory[]> {
  const response = await publicRequest<ApiEnvelope<PostCategory[]>>(
    "/public/post-categories",
  );
  return response.data;
}

export async function getPublicProjects(options: {
  category?: string;
} = {}): Promise<ProjectRecord[]> {
  const response = await publicRequest<ApiEnvelope<ProjectRecord[]>>(
    `/public/projects${queryString({ category: options.category })}`,
  );
  return response.data;
}

export async function getPublicProjectBySlug(
  slug: string,
): Promise<ProjectRecord> {
  const response = await publicRequest<ApiEnvelope<ProjectRecord>>(
    `/public/projects/${encodeURIComponent(slug)}`,
  );
  return response.data;
}

export async function getPublicProjectCategories(): Promise<ProjectCategory[]> {
  const response = await publicRequest<ApiEnvelope<ProjectCategory[]>>(
    "/public/project-categories",
  );
  return response.data;
}

export async function getPublicSettings(): Promise<SettingsRecord> {
  const response = await publicRequest<ApiEnvelope<SettingsRecord>>(
    "/public/settings",
  );
  return response.data;
}
