import { ConflictException } from "@nestjs/common";
import { IMAGE_MAX_BYTES } from "../common/constants";
import { MediaService } from "./media.service";
import { validateMediaFile } from "./media-validation";

function webpBuffer() {
  return Buffer.from([
    0x52, 0x49, 0x46, 0x46, 0x04, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50,
  ]);
}

function file(
  overrides: Partial<Express.Multer.File> = {},
): Express.Multer.File {
  const buffer = webpBuffer();
  return {
    fieldname: "file",
    originalname: "test.webp",
    encoding: "7bit",
    mimetype: "image/webp",
    size: buffer.length,
    buffer,
    destination: "",
    filename: "",
    path: "",
    stream: null as never,
    ...overrides,
  };
}

describe("Media validation", () => {
  it("accepts a supported MIME with a valid signature", () => {
    expect(validateMediaFile(file())).toBeNull();
  });

  it("rejects an invalid MIME", () => {
    expect(validateMediaFile(file({ mimetype: "text/plain" }))).toBe(
      "Unsupported media type",
    );
  });

  it("rejects an invalid signature", () => {
    expect(
      validateMediaFile(
        file({
          buffer: Buffer.from("not-an-image"),
          size: Buffer.byteLength("not-an-image"),
        }),
      ),
    ).toBe("File content does not match its MIME type");
  });

  it("rejects oversized images", () => {
    expect(
      validateMediaFile(
        file({
          buffer: Buffer.alloc(IMAGE_MAX_BYTES + 1),
          size: IMAGE_MAX_BYTES + 1,
        }),
      ),
    ).toBe("File exceeds the allowed size");
  });
});

describe("MediaService", () => {
  const mediaModel = {
    create: jest.fn(),
    findById: jest.fn(),
    deleteOne: jest.fn(),
  };
  const postModel = { exists: jest.fn() };
  const projectModel = { exists: jest.fn() };
  const settingsModel = { exists: jest.fn() };
  const r2Service = {
    upload: jest.fn(),
    delete: jest.fn(),
    publicUrl: jest.fn((key: string) => `https://media.example/${key}`),
  };
  let service: MediaService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new MediaService(
      mediaModel as any,
      postModel as any,
      projectModel as any,
      settingsModel as any,
      r2Service as any,
    );
  });

  it("uploads a valid file to R2 and stores metadata", async () => {
    r2Service.upload.mockResolvedValue(undefined);
    mediaModel.create.mockResolvedValue({
      _id: "media-1",
      mimeType: "image/webp",
    });

    const result = await service.upload(file());

    expect(r2Service.upload).toHaveBeenCalledWith(
      expect.stringMatching(/^media\/\d{4}\/\d{2}\/.+\.webp$/),
      expect.any(Buffer),
      "image/webp",
    );
    expect(result).toMatchObject({
      id: "media-1",
      mimeType: "image/webp",
    });
  });

  it("returns 409 for referenced deletion", async () => {
    mediaModel.findById.mockReturnValue({
      exec: jest
        .fn()
        .mockResolvedValue({ _id: "media-1", storageKey: "media/test.webp" }),
    });
    postModel.exists.mockResolvedValue({ _id: "post-1" });
    projectModel.exists.mockResolvedValue(null);
    settingsModel.exists.mockResolvedValue(null);

    await expect(service.remove("media-1")).rejects.toBeInstanceOf(
      ConflictException,
    );
    expect(r2Service.delete).not.toHaveBeenCalled();
  });

  it("deletes an unreferenced object and metadata", async () => {
    mediaModel.findById.mockReturnValue({
      exec: jest
        .fn()
        .mockResolvedValue({ _id: "media-1", storageKey: "media/test.webp" }),
    });
    postModel.exists.mockResolvedValue(null);
    projectModel.exists.mockResolvedValue(null);
    settingsModel.exists.mockResolvedValue(null);
    r2Service.delete.mockResolvedValue(undefined);
    mediaModel.deleteOne.mockReturnValue({
      exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    });

    await expect(service.remove("media-1")).resolves.toEqual({ deleted: true });
    expect(r2Service.delete).toHaveBeenCalledWith("media/test.webp");
    expect(mediaModel.deleteOne).toHaveBeenCalledWith({ _id: "media-1" });
  });
});
