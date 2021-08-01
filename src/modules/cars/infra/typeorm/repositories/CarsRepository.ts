import {ICreateCarDTO} from "@modules/cars/dtos/ICreateCarDTO";
import {ICarsRepository} from "@modules/cars/repositories/ICarsRepository";
import {Car} from "../entities/Car";
import {getRepository, Repository} from "typeorm";


class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
                     brand,
                     daily_rate,
                     license_plate,
                     fine_amount,
                     category_id,
                     description,
                     name
                 }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            brand,
            daily_rate,
            license_plate,
            fine_amount,
            category_id,
            description,
            name
        });

        await this.repository.save(car);

        return car;
    }


    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate
        });

        return car;
    }
}

export { CarsRepository };