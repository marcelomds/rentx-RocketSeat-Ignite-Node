import {ICarsRepository} from "@modules/cars/repositories/ICarsRepository";
import {Car} from "@modules/cars/infra/typeorm/entities/Car";


class ListCarsUseCase {
    constructor(
        private carsRepository: ICarsRepository
    ) {}

    async execute(): Promise<Car[]>{
        const cars = await this.carsRepository.findAvailable();
        return cars
    }
}

export { ListCarsUseCase };