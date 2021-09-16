import {ListCarsUseCase} from "./ListCarsUseCase";
import {CarsRepositoryInMemory} from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it('should be able to list all available cars', async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Car 01",
            description: "Car01 description",
            daily_rate: 500.00,
            license_plate: "ABC-1221",
            fine_amount: 100,
            brand: "Car_brand",
            category_id: "category_id"
        });

        const cars = await listCarsUseCase.execute();

        expect(cars).toEqual([car]);
    });

});
