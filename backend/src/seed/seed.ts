import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import dotenv from "dotenv";
import { validateSeedEnvironment } from "../config/env.validation";
import { SeedModule } from "./seed.module";
import { SeedService } from "./seed.service";

async function runSeed() {
  dotenv.config();
  validateSeedEnvironment(process.env);

  const app = await NestFactory.createApplicationContext(SeedModule, {
    logger: ["error", "warn"],
  });
  try {
    const report = await app.get(SeedService).run();
    console.log("Seed completed\n");
    console.log(`Admin:               1 ${report.admin}`);
    console.log(`Project categories:  ${report.projectCategories}`);
    console.log(`Legacy media:         ${report.legacyMedia}`);
    console.log(`Legacy projects:      ${report.legacyProjects}`);
    console.log(`Settings:             ${report.settings}\n`);
    console.log(`R2 uploaded:          ${report.r2Uploads}`);
    console.log(`R2 existing:          ${report.r2Existing}`);
    console.log(`R2 upload failures:   ${report.r2UploadFailures}`);
    console.log(`Broken media refs:    ${report.brokenMediaRefs}`);
  } finally {
    await app.close();
  }
}

runSeed().catch((error: unknown) => {
  console.error(
    `Seed failed: ${error instanceof Error ? error.message : "unknown error"}`,
  );
  process.exitCode = 1;
});
