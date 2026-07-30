import { Controller, Get, ServiceUnavailableException } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";

@Controller("health")
export class HealthController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get()
  check() {
    // readyState 1 means connected
    if (this.connection.readyState === 1) {
      return { status: "ok", database: "connected", timestamp: new Date().toISOString() };
    } else {
      throw new ServiceUnavailableException({
        status: "error",
        database: "disconnected",
        timestamp: new Date().toISOString(),
      });
    }
  }
}
