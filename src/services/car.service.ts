import CarRepository, { CarInput } from "../repositories/car.repository";

class CarService {
  async createCar(data: CarInput, userId: string) {
    const car = await CarRepository.createCar({ ...data, UserId: userId });

    return car;
  }
}

export default new CarService();
