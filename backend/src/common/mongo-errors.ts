import { ConflictException } from "@nestjs/common";

export function rethrowMongoConflict(
  error: unknown,
  message = "A record with this unique value already exists",
): never {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === 11000
  ) {
    throw new ConflictException({
      code: "DUPLICATE_VALUE",
      message,
    });
  }
  throw error;
}
