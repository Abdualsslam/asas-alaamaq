import {
  ALLOWED_MEDIA_TYPES,
  IMAGE_MAX_BYTES,
  PDF_MAX_BYTES,
} from "../common/constants";

const allowed = new Set<string>(ALLOWED_MEDIA_TYPES);

function ascii(buffer: Buffer, start: number, end: number): string {
  return buffer.subarray(start, end).toString("ascii");
}

export function hasValidSignature(buffer: Buffer, mimeType: string): boolean {
  if (buffer.length < 12) return false;
  switch (mimeType) {
    case "image/jpeg":
      return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    case "image/png":
      return buffer.subarray(0, 8).equals(
        Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
      );
    case "image/webp":
      return ascii(buffer, 0, 4) === "RIFF" && ascii(buffer, 8, 12) === "WEBP";
    case "image/avif":
      return ascii(buffer, 4, 8) === "ftyp" && ascii(buffer, 8, 12).includes("avif");
    case "application/pdf":
      return ascii(buffer, 0, 5) === "%PDF-";
    default:
      return false;
  }
}

export function validateMediaFile(file?: Express.Multer.File): string | null {
  if (!file || !file.buffer || file.buffer.length === 0 || file.size === 0) {
    return "A non-empty file is required";
  }
  if (!allowed.has(file.mimetype)) return "Unsupported media type";
  const max =
    file.mimetype === "application/pdf" ? PDF_MAX_BYTES : IMAGE_MAX_BYTES;
  if (file.size > max) return "File exceeds the allowed size";
  if (!hasValidSignature(file.buffer, file.mimetype)) {
    return "File content does not match its MIME type";
  }
  return null;
}
