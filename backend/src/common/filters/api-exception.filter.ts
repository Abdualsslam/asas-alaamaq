import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import type { Request, Response } from "express";

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionBody =
      exception instanceof HttpException ? exception.getResponse() : null;

    let body: Record<string, unknown>;
    if (typeof exceptionBody === "object" && exceptionBody !== null) {
      body = { ...(exceptionBody as Record<string, unknown>) };
    } else {
      body = {
        message:
          typeof exceptionBody === "string"
            ? exceptionBody
            : "Internal server error",
      };
    }

    if (!(exception instanceof HttpException)) {
      this.logger.error(
        `${request.method} ${request.url}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
      body = {
        statusCode: status,
        code: "INTERNAL_ERROR",
        message: "Internal server error",
      };
    }

    response.status(status).json({
      statusCode: status,
      code: body.code ?? `HTTP_${status}`,
      ...body,
    });
  }
}
