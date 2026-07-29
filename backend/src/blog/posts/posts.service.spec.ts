import {
  ConflictException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { PostsService } from "./posts.service";

describe("PostsService", () => {
  const postModel = {
    create: jest.fn(),
    find: jest.fn(),
    countDocuments: jest.fn(),
  };
  const categoryModel = { exists: jest.fn(), findOne: jest.fn() };
  const mediaModel = { exists: jest.fn() };
  let service: PostsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PostsService(
      postModel as any,
      categoryModel as any,
      mediaModel as any,
    );
  });

  it("creates a draft with safe defaults", async () => {
    postModel.create.mockResolvedValue({
      _id: "post-1",
      status: "draft",
    });

    const result = await service.create({
      titleAr: "مقال تجريبي",
      slug: "draft-post",
    });

    expect(postModel.create).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "draft",
        excerptAr: "",
        contentAr: "",
      }),
    );
    expect(result).toMatchObject({ id: "post-1", status: "draft" });
  });

  it("publishes a valid article", async () => {
    postModel.create.mockResolvedValue({
      _id: "post-2",
      status: "published",
    });

    const result = await service.create({
      titleAr: "مقال منشور",
      slug: "published-post",
      excerptAr: "ملخص",
      contentAr: "## المحتوى",
      status: "published",
    });

    expect(result).toMatchObject({ status: "published" });
    expect(postModel.create).toHaveBeenCalledWith(
      expect.objectContaining({ publishedAt: expect.any(Date) }),
    );
  });

  it("rejects an invalid publish request", async () => {
    await expect(
      service.create({
        titleAr: "غير مكتمل",
        slug: "invalid-publish",
        status: "published",
      }),
    ).rejects.toBeInstanceOf(UnprocessableEntityException);
    expect(postModel.create).not.toHaveBeenCalled();
  });

  it("excludes drafts and returns published articles publicly", async () => {
    const queryFilter: Record<string, unknown>[] = [];
    const chain = {
      populate: jest.fn(),
      sort: jest.fn(),
      skip: jest.fn(),
      limit: jest.fn(),
      lean: jest.fn(),
      exec: jest.fn().mockResolvedValue([
        {
          _id: "published-1",
          titleAr: "منشور",
          slug: "visible-post",
          status: "published",
        },
      ]),
    };
    chain.populate.mockReturnValue(chain);
    chain.sort.mockReturnValue(chain);
    chain.skip.mockReturnValue(chain);
    chain.limit.mockReturnValue(chain);
    chain.lean.mockReturnValue(chain);
    postModel.find.mockImplementation((filter) => {
      queryFilter.push(filter);
      return chain;
    });
    postModel.countDocuments.mockReturnValue({
      exec: jest.fn().mockResolvedValue(1),
    });

    const result = (await service.publicList({ page: 1, limit: 12 })) as {
      data: Array<{ slug: string }>;
    };

    expect(queryFilter[0]).toEqual({ status: "published" });
    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toMatchObject({ slug: "visible-post" });
  });

  it("enforces unique slugs", async () => {
    postModel.create.mockRejectedValue({ code: 11000 });

    await expect(
      service.create({
        titleAr: "مكرر",
        slug: "duplicate",
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
