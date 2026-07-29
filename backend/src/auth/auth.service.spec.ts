import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  const adminModel = {
    findOne: jest.fn(),
  };
  const jwtService = {
    signAsync: jest.fn().mockResolvedValue("signed-token"),
  };
  let service: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthService(adminModel as any, jwtService as any);
  });

  function mockLoginAdmin(
    admin: {
      id: string;
      email: string;
      passwordHash: string;
      isActive: boolean;
      lastLoginAt?: Date;
      save: jest.Mock;
    } | null,
  ) {
    adminModel.findOne.mockReturnValue({
      select: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(admin),
      }),
    });
  }

  it("accepts a valid login and signs a session", async () => {
    const admin = {
      id: "admin-1",
      email: "admin@example.com",
      passwordHash: "hash",
      isActive: true,
      save: jest.fn().mockResolvedValue(undefined),
    };
    mockLoginAdmin(admin);
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true as never);

    const result = await service.login(" ADMIN@example.com ", "valid-password");

    expect(result.token).toBe("signed-token");
    expect(result.admin.email).toBe("admin@example.com");
    expect(admin.save).toHaveBeenCalled();
  });

  it("rejects an invalid password", async () => {
    mockLoginAdmin({
      id: "admin-1",
      email: "admin@example.com",
      passwordHash: "hash",
      isActive: true,
      save: jest.fn(),
    });
    jest.spyOn(bcrypt, "compare").mockResolvedValue(false as never);

    await expect(
      service.login("admin@example.com", "wrong-password"),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it("rejects an inactive admin", async () => {
    mockLoginAdmin({
      id: "admin-1",
      email: "admin@example.com",
      passwordHash: "hash",
      isActive: false,
      save: jest.fn(),
    });
    jest.spyOn(bcrypt, "compare").mockResolvedValue(true as never);

    await expect(
      service.login("admin@example.com", "valid-password"),
    ).rejects.toMatchObject({
      response: { code: "ADMIN_INACTIVE" },
    });
  });
});
