import { sequelize } from "../config/db.config.js";
import { ParkingZoneCars } from "../models/parkingZone.model.js";

interface IParkingZoneCars {
  id: string;
  isParked: boolean;
  ParkingZoneId: string;
  CarId: string;
}

interface ParkingZoneCarsInput {
  isParked: boolean;
  ParkingZoneId: string;
  CarId: string;
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
}

export default new ParkingZoneCarsRepository();
