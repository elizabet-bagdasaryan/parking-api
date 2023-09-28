import { sequelize } from "../config/db.config";
import { Car } from "../models/car.model";

export interface ICar {
  id: string;
  brand: string;
  number: string;
  type: string;
  year: string;
  UserId: string;
}

export interface CarInput {
  brand: string;
  number: string;
  type: string;
  year: string;
  UserId: string;
}

class CarRepository {
  db = {};

  constructor() {
    this.db = sequelize;
  }

  async getCar(carId: string) {
    const car = await Car.findOne({ where: { id: carId } });
    return car;
  }

  async createCar(car: CarInput) {
    const data = await Car.create(car as unknown as Omit<any, string>);
    return data.dataValues;
  }

  async updateCar(carId: string, car: CarInput) {
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

  async deleteCar(carId: string) {
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
}

export default new CarRepository();
