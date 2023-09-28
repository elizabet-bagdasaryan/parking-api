import { sequelize } from "../config/db.config";
import { ParkingZoneCars } from "../models/parkingZone.model";

export interface IParkingZoneCars {
  id: number;
  isParked: boolean;
  ParkingZoneId: number;
  CarId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface ParkingZoneCarsInput {
  isParked: boolean;
  ParkingZoneId: number;
  CarId: number;
}

class ParkingZoneCarsRepository {
  db = {};

  constructor() {
    this.db = sequelize;
  }

  async createParkingZoneCars(parkingZoneCar: ParkingZoneCarsInput) {
    const data = await ParkingZoneCars.create(
      parkingZoneCar as unknown as Omit<any, string>
    );
    return data;
  }

  async find(carId: number) {
    const foundParkingZoneCar = await ParkingZoneCars.findOne({
      where: {
        CarId: carId,
        isParked: true,
      },
    });

    if (!foundParkingZoneCar) {
      const error = new Error("Your car is not parked");
      // @ts-ignore
      error.statusCode = 404;
      throw error;
    }

    return foundParkingZoneCar;
  }

  async unparkParkingZoneCars(carId: number) {
    const foundParkingZoneCar = await this.find(carId);
    const updatedParkingZoneCar = await foundParkingZoneCar.update(
      { isParked: false },
      {
        where: {
          id: carId,
        },
      }
    );

    return updatedParkingZoneCar.dataValues as IParkingZoneCars;
  }

  async getHistoryForAdmin() {
    const history = await ParkingZoneCars.findAll();
    return history.map((item) => item.dataValues);
  }

  async getByCarIds(carIds: number[]) {
    const history = await ParkingZoneCars.findAll({
      where: {
        CarId: carIds,
      },
    });
    return history.map((item) => item.dataValues);
  }
}

export default new ParkingZoneCarsRepository();
