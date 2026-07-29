export interface ApiFieldError {
  field: string;
  message: string;
}

interface ApiErrorBody {
  statusCode?: number;
  code?: string;
  message?: string | string[];
  errors?: ApiFieldError[];
}

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly fieldErrors: ApiFieldError[];

  constructor(
    message: string,
    options: { status: number; code?: string; fieldErrors?: ApiFieldError[] },
  ) {
    super(message);
    this.name = "ApiError";
    this.status = options.status;
    this.code = options.code ?? `HTTP_${options.status}`;
    this.fieldErrors = options.fieldErrors ?? [];
  }
}

export async function parseApiResponse<T>(response: Response): Promise<T> {
  const body = (await response.json().catch(() => null)) as ApiErrorBody | T | null;
  if (response.ok) return body as T;

  const errorBody = (body ?? {}) as ApiErrorBody;
  const message = Array.isArray(errorBody.message)
    ? errorBody.message.join(", ")
    : errorBody.message || "تعذر إكمال الطلب";

  throw new ApiError(message, {
    status: response.status,
    code: errorBody.code,
    fieldErrors: Array.isArray(errorBody.errors) ? errorBody.errors : [],
  });
}

export function getFieldError(error: unknown, field: string): string | undefined {
  if (!(error instanceof ApiError)) return undefined;
  return error.fieldErrors.find((item) => item.field === field)?.message;
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "تعذر إكمال الطلب";
}
