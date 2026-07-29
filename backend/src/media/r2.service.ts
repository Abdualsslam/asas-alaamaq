import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

@Injectable()
export class R2Service {
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly publicBaseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.bucket = this.configService.getOrThrow<string>("R2_BUCKET");
    this.publicBaseUrl = this.configService
      .getOrThrow<string>("R2_PUBLIC_BASE_URL")
      .replace(/\/+$/, "");
    this.client = new S3Client({
      region: "auto",
      endpoint: `https://${this.configService.getOrThrow<string>(
        "R2_ACCOUNT_ID",
      )}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>("R2_ACCESS_KEY_ID"),
        secretAccessKey: this.configService.getOrThrow<string>(
          "R2_SECRET_ACCESS_KEY",
        ),
      },
    });
  }

  publicUrl(storageKey: string): string {
    return `${this.publicBaseUrl}/${storageKey}`;
  }

  async upload(
    storageKey: string,
    body: Buffer,
    contentType: string,
  ): Promise<void> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: storageKey,
        Body: body,
        ContentType: contentType,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    );
  }

  async exists(storageKey: string): Promise<boolean> {
    try {
      await this.client.send(
        new HeadObjectCommand({ Bucket: this.bucket, Key: storageKey }),
      );
      return true;
    } catch (error) {
      const status =
        typeof error === "object" &&
        error !== null &&
        "$metadata" in error &&
        typeof error.$metadata === "object" &&
        error.$metadata !== null &&
        "httpStatusCode" in error.$metadata
          ? error.$metadata.httpStatusCode
          : undefined;
      if (status === 404) return false;
      throw error;
    }
  }

  async delete(storageKey: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({ Bucket: this.bucket, Key: storageKey }),
    );
  }
}
