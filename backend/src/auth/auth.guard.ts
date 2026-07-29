import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import type { Request } from "express";
import type { AuthenticatedAdmin } from "./current-admin.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { admin?: AuthenticatedAdmin }>();
    const cookieName =
      this.configService.get<string>("COOKIE_NAME") ?? "asas_admin_session";
    const token = request.cookies?.[cookieName] as string | undefined;

    if (!token) {
      throw new UnauthorizedException({
        code: "AUTH_REQUIRED",
        message: "Authentication required",
      });
    }

    try {
      request.admin = await this.jwtService.verifyAsync<AuthenticatedAdmin>(
        token,
        {
          secret: this.configService.getOrThrow<string>("JWT_SECRET"),
        },
      );
      return true;
    } catch {
      throw new UnauthorizedException({
        code: "INVALID_SESSION",
        message: "Session is invalid or expired",
      });
    }
  }
}
