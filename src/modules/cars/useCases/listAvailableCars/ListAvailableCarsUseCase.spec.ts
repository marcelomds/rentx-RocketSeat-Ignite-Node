import {CarsRepositoryInMemory} from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import {ListAvailableCarsUseCase} from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
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

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be to able to list all available cars by brand", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Car 02",
            description: "Car02 description",
            daily_rate: 500.00,
            license_plate: "ABC-1221",
            fine_amount: 100,
            brand: "Car_brand_test",
            category_id: "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_brand"
        });


        expect(cars).toEqual([car]);
    });

    it("should be to able to list all available cars by name", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Car 03",
            description: "Car03 description",
            daily_rate: 500.00,
            license_plate: "ABC-1234",
            fine_amount: 100,
            brand: "Car_brand_test",
            category_id: "category_id"
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car 03"
        });


        expect(cars).toEqual([car]);
    });


    it("should be to able to list all available cars by category", async () => {

        const car = await carsRepositoryInMemory.create({
            name: "Car 04",
            description: "Car04 description",
            daily_rate: 500.00,
            license_plate: "ABC-5678",
            fine_amount: 100,
            brand: "Car_brand_test",
            category_id: "123456789"
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "123456789"
        });


        expect(cars).toEqual([car]);
    });

});
