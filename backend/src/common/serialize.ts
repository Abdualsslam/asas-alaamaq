import { Types } from "mongoose";

export function serializeEntity(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (value instanceof Date) return value;
  if (value instanceof Types.ObjectId) return value.toString();
  if (Array.isArray(value)) return value.map(serializeEntity);

  if (typeof value === "object") {
    const candidate = value as {
      toObject?: () => Record<string, unknown>;
    };
    const plain =
      typeof candidate.toObject === "function"
        ? candidate.toObject()
        : (value as Record<string, unknown>);
    const result: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(plain)) {
      if (key === "__v" || key === "passwordHash") continue;
      if (key === "_id") {
        result.id = String(child);
      } else {
        result[key] = serializeEntity(child);
      }
    }
    return result;
  }

  return value;
}
