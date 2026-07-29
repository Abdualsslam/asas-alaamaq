const requiredAppKeys = [
  "MONGODB_URI",
  "FRONTEND_URL",
  "JWT_SECRET",
  "R2_ACCOUNT_ID",
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
  "R2_BUCKET",
  "R2_PUBLIC_BASE_URL",
] as const;

export function validateAppEnvironment(
  config: Record<string, unknown>,
): Record<string, unknown> {
  const missing = requiredAppKeys.filter(
    (key) => typeof config[key] !== "string" || !String(config[key]).trim(),
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }

  if (String(config.JWT_SECRET).length < 32) {
    throw new Error("JWT_SECRET must contain at least 32 characters");
  }

  return config;
}

export function validateSeedEnvironment(
  config: NodeJS.ProcessEnv,
): NodeJS.ProcessEnv {
  validateAppEnvironment(config);
  const missing = ["SEED_ADMIN_EMAIL", "SEED_ADMIN_PASSWORD"].filter(
    (key) => !config[key]?.trim(),
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing required seed environment variables: ${missing.join(", ")}`,
    );
  }

  if ((config.SEED_ADMIN_PASSWORD?.length ?? 0) < 12) {
    throw new Error("SEED_ADMIN_PASSWORD must contain at least 12 characters");
  }

  return config;
}
