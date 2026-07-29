import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Response } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "./auth.guard";
import {
  AuthenticatedAdmin,
  CurrentAdmin,
} from "./current-admin.decorator";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post("login")
  @HttpCode(200)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(dto.email, dto.password);
    const cookieName =
      this.configService.get<string>("COOKIE_NAME") ?? "asas_admin_session";
    const secure =
      this.configService.get<string>("COOKIE_SECURE") === "true" ||
      this.configService.get<string>("NODE_ENV") === "production";
    const sameSiteValue =
      this.configService.get<string>("COOKIE_SAME_SITE") ?? "lax";
    const sameSite =
      sameSiteValue === "none" || sameSiteValue === "strict"
        ? sameSiteValue
        : "lax";

    response.cookie(cookieName, result.token, {
      httpOnly: true,
      secure,
      sameSite,
      domain: this.configService.get<string>("COOKIE_DOMAIN") || undefined,
      path: "/api",
      maxAge: 12 * 60 * 60 * 1000,
    });
    return { data: result.admin };
  }

  @Post("logout")
  @HttpCode(200)
  logout(@Res({ passthrough: true }) response: Response) {
    const cookieName =
      this.configService.get<string>("COOKIE_NAME") ?? "asas_admin_session";
    response.clearCookie(cookieName, {
      httpOnly: true,
      secure:
        this.configService.get<string>("COOKIE_SECURE") === "true" ||
        this.configService.get<string>("NODE_ENV") === "production",
      sameSite: "lax",
      domain: this.configService.get<string>("COOKIE_DOMAIN") || undefined,
      path: "/api",
    });
    return { data: { loggedOut: true } };
  }

  @Get("me")
  @UseGuards(AuthGuard)
  async me(@CurrentAdmin() admin: AuthenticatedAdmin) {
    return { data: await this.authService.getAdmin(admin.sub) };
  }
}
