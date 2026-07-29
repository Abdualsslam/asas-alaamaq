import { NotFoundException } from "@nestjs/common";
import { ProjectsService } from "./projects.service";

describe("ProjectsService public contract", () => {
  const projectModel = {
    find: jest.fn(),
    findOne: jest.fn(),
  };
  const categoryModel = {
    findOne: jest.fn(),
  };
  const mediaModel = {};
  let service: ProjectsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new ProjectsService(
      projectModel as any,
      categoryModel as any,
      mediaModel as any,
    );
  });

  function publicListChain(records: Array<Record<string, unknown>>) {
    const chain = {
      populate: jest.fn(),
      sort: jest.fn(),
      lean: jest.fn(),
      exec: jest.fn().mockResolvedValue(records),
    };
    chain.populate.mockReturnValue(chain);
    chain.sort.mockReturnValue(chain);
    chain.lean.mockReturnValue(chain);
    return chain;
  }

  it("lists only published projects in sortOrder order", async () => {
    const filters: Array<Record<string, unknown>> = [];
    const chain = publicListChain([
      { _id: "p-1", status: "published", sortOrder: 1 },
      { _id: "p-2", status: "published", sortOrder: 2 },
    ]);
    projectModel.find.mockImplementation((filter) => {
      filters.push(filter);
      return chain;
    });

    const result = (await service.publicList({})) as Array<{
      id: string;
      sortOrder: number;
    }>;

    expect(filters[0]).toEqual({ status: "published" });
    expect(chain.sort).toHaveBeenCalledWith({ sortOrder: 1 });
    expect(result.map((item) => item.sortOrder)).toEqual([1, 2]);
  });

  it("applies the project category filter", async () => {
    categoryModel.findOne.mockReturnValue({
      lean: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ _id: "category-1" }),
      }),
    });
    const filters: Array<Record<string, unknown>> = [];
    projectModel.find.mockImplementation((filter) => {
      filters.push(filter);
      return publicListChain([]);
    });

    await service.publicList({ category: "shoring" });

    expect(categoryModel.findOne).toHaveBeenCalledWith({ slug: "shoring" });
    expect(filters[0]).toEqual({
      status: "published",
      categoryId: "category-1",
    });
  });

  it("returns an empty list for an unknown category", async () => {
    categoryModel.findOne.mockReturnValue({
      lean: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      }),
    });

    await expect(service.publicList({ category: "missing" })).resolves.toEqual(
      [],
    );
    expect(projectModel.find).not.toHaveBeenCalled();
  });

  it("keeps detailEnabled=false projects inaccessible publicly", async () => {
    const chain = {
      populate: jest.fn(),
      lean: jest.fn(),
      exec: jest.fn().mockResolvedValue(null),
    };
    chain.populate.mockReturnValue(chain);
    chain.lean.mockReturnValue(chain);
    projectModel.findOne.mockReturnValue(chain);

    await expect(
      service.publicDetail("legacy-gallery-01"),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(projectModel.findOne).toHaveBeenCalledWith({
      slug: "legacy-gallery-01",
      status: "published",
      detailEnabled: true,
    });
  });
});
