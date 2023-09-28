import { sequelize } from "../config/db.config";
import { Car } from "../models/car.model";

export interface ICar {
  id: number;
  brand: string;
  number: string;
  type: string;
  year: string;
  UserId: number;
}

export interface CarInput {
  brand: string;
  number: string;
  type: string;
  year: string;
  UserId: number;
}

class CarRepository {
  db = {};

  constructor() {
    this.db = sequelize;
  }

  async getCar(carId: number) {
    const car = await Car.findOne({ where: { id: carId } });
    return car?.dataValues;
  }

  async createCar(car: CarInput) {
    const data = await Car.create(car as unknown as Omit<any, string>);
    return data.dataValues;
  }

  async updateCar(carId: number, car: CarInput) {
    const foundCar = await Car.findByPk(carId);

    if (!foundCar) {
      const error = new Error("Could not find car.");
      // @ts-ignore
      error.statusCode = 404;
      throw error;
    }
    await Car.update(
      { ...car },
      {
        where: {
          id: carId,
        },
      }
    );
  }

  async deleteCar(carId: number) {
    const foundCar = await Car.findByPk(carId);

    if (!foundCar) {
      const error = new Error("Could not find car.");
      // @ts-ignore
      error.statusCode = 404;
      throw error;
    }

    await Car.destroy({
      where: {
        id: carId,
      },
    });
  }

  async getUserCars(userId: number) {
    const cars = await Car.findAll({ where: { UserId: userId } });
    return cars.map((item) => item.dataValues);
  }
}

export default new CarRepository();
