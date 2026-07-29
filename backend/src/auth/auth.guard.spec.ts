import { UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";

describe("AuthGuard", () => {
  const jwtService = { verifyAsync: jest.fn() };
  const configService = {
    get: jest.fn((key: string) =>
      key === "COOKIE_NAME" ? "asas_admin_session" : undefined,
    ),
    getOrThrow: jest.fn().mockReturnValue("a-secure-test-secret"),
  };
  let guard: AuthGuard;

  beforeEach(() => {
    jest.clearAllMocks();
    guard = new AuthGuard(jwtService as any, configService as any);
  });

  function context(cookies: Record<string, string>) {
    const request = { cookies } as Record<string, unknown>;
    return {
      request,
      context: {
        switchToHttp: () => ({
          getRequest: () => request,
        }),
      },
    };
  }

  it("allows authenticated GET /auth/me requests", async () => {
    const test = context({ asas_admin_session: "valid-token" });
    jwtService.verifyAsync.mockResolvedValue({
      sub: "admin-1",
      email: "admin@example.com",
    });

    await expect(guard.canActivate(test.context as any)).resolves.toBe(true);
    expect(test.request.admin).toEqual({
      sub: "admin-1",
      email: "admin@example.com",
    });
  });

  it("rejects unauthenticated GET /auth/me requests", async () => {
    const test = context({});

    await expect(guard.canActivate(test.context as any)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
});
