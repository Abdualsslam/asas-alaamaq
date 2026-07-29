import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Model } from "mongoose";
import { Admin, AdminDocument } from "../admins/admin.schema";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name)
    private readonly adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const admin = await this.adminModel
      .findOne({ email: normalizedEmail })
      .select("+passwordHash")
      .exec();

    if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
      throw new UnauthorizedException({
        code: "INVALID_CREDENTIALS",
        message: "Email or password is incorrect",
      });
    }

    if (!admin.isActive) {
      throw new UnauthorizedException({
        code: "ADMIN_INACTIVE",
        message: "Admin account is inactive",
      });
    }

    admin.lastLoginAt = new Date();
    await admin.save();
    const payload = { sub: admin.id, email: admin.email };
    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        lastLoginAt: admin.lastLoginAt,
      },
    };
  }

  async getAdmin(adminId: string) {
    const admin = await this.adminModel
      .findOne({ _id: adminId, isActive: true })
      .lean()
      .exec();
    if (!admin) {
      throw new UnauthorizedException({
        code: "ADMIN_INACTIVE",
        message: "Admin account is inactive or missing",
      });
    }
    return {
      id: String(admin._id),
      email: admin.email,
      lastLoginAt: admin.lastLoginAt,
    };
  }
}
