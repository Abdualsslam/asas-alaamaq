import { ValidationPipe } from "@nestjs/common";
import { validationExceptionFactory } from "../common/validation";
import { UpdateSettingsDto } from "./dto/settings.dto";
import { SettingsService } from "./settings.service";

const settingsPayload: UpdateSettingsDto = {
  phones: [{ display: "+966 50 000 0000", raw: "+966500000000" }],
  whatsappNumber: "+966500000000",
  email: "info@example.com",
  website: "example.com",
  location: {
    ar: { city: "الرياض", country: "السعودية" },
    en: { city: "Riyadh", country: "Saudi Arabia" },
  },
  social: {},
  stats: [
    {
      key: "years-experience",
      value: 10,
      suffixAr: "+",
      suffixEn: "+",
      labelAr: "سنة خبرة",
      labelEn: "Years of Experience",
      sortOrder: 1,
    },
  ],
};

describe("SettingsService", () => {
  const settingsModel = {
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
  };
  const mediaModel = { findById: jest.fn() };
  let service: SettingsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new SettingsService(settingsModel as any, mediaModel as any);
  });

  it("gets the singleton settings document", async () => {
    const chain = {
      populate: jest.fn(),
      lean: jest.fn(),
      exec: jest.fn().mockResolvedValue({ _id: "settings-1", key: "main" }),
    };
    chain.populate.mockReturnValue(chain);
    chain.lean.mockReturnValue(chain);
    settingsModel.findOne.mockReturnValue(chain);

    await expect(service.get()).resolves.toMatchObject({
      id: "settings-1",
      key: "main",
    });
    expect(settingsModel.findOne).toHaveBeenCalledWith({ key: "main" });
  });

  it("updates the singleton settings document", async () => {
    const chain = {
      populate: jest.fn(),
      exec: jest.fn().mockResolvedValue({
        _id: "settings-1",
        key: "main",
        ...settingsPayload,
      }),
    };
    chain.populate.mockReturnValue(chain);
    settingsModel.findOneAndUpdate.mockReturnValue(chain);

    await expect(service.update(settingsPayload)).resolves.toMatchObject({
      id: "settings-1",
      email: "info@example.com",
    });
    expect(settingsModel.findOneAndUpdate).toHaveBeenCalledWith(
      { key: "main" },
      { ...settingsPayload, key: "main" },
      { new: true, runValidators: true },
    );
  });

  it("rejects unknown settings properties", async () => {
    const pipe = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: validationExceptionFactory,
    });

    await expect(
      pipe.transform(
        { ...settingsPayload, unknownProperty: true },
        { type: "body", metatype: UpdateSettingsDto },
      ),
    ).rejects.toMatchObject({
      response: {
        code: "VALIDATION_ERROR",
        errors: expect.arrayContaining([
          expect.objectContaining({ field: "unknownProperty" }),
        ]),
      },
    });
  });
});
