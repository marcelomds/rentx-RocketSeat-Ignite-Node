import {ListCategoriesController} from "./ListCategoriesController";
import {ListCategoriesUseCase} from "./ListCategoriesUseCase";
import {CategoriesRepository} from "../../repositories/implementations/CategoriesRepository";

const categoriesRepository = null;
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(listCategoriesUseCase);

export { listCategoriesController };