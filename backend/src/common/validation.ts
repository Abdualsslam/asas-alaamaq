import { UnprocessableEntityException } from "@nestjs/common";
import type { ValidationError } from "class-validator";

function flattenErrors(
  validationErrors: ValidationError[],
  prefix = "",
): Array<{ field: string; message: string }> {
  return validationErrors.flatMap((error) => {
    const field = prefix ? `${prefix}.${error.property}` : error.property;
    const ownErrors = Object.values(error.constraints ?? {}).map((message) => ({
      field,
      message,
    }));
    return [
      ...ownErrors,
      ...flattenErrors(error.children ?? [], field),
    ];
  });
}

export function validationExceptionFactory(
  errors: ValidationError[],
): UnprocessableEntityException {
  return new UnprocessableEntityException({
    statusCode: 422,
    code: "VALIDATION_ERROR",
    message: "Validation failed",
    errors: flattenErrors(errors),
  });
}
