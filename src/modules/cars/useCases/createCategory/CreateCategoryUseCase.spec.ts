import {CreateCategoryUseCase} from "./CreateCategoryUseCase";
import {CategoriesRepositoryInMemory} from "../../repositories/in-memory/CategoriesRepositoryInMemory";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });

    it('should be able to create a new category', async () => {
        const category = {
            name: "Category Test",
            description: "Category description test"
        }
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        })

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");
    });
});