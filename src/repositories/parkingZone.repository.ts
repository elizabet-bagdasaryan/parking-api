import { sequelize } from "../config/db.config";
import { ParkingZone } from "../models/parkingZone.model";

interface IParkingZone {
  id: number;
  name: string;
  address: string;
  rate: number;
}

interface ParkingZoneInput {
  name: string;
  address: string;
  rate: number;
}

class ParkingZoneRepository {
  db = {};

  constructor() {
    this.db = sequelize;
  }

  async getParkingZone(parkingZoneId: number) {
    const parkingZone = await ParkingZone.findOne({
      where: { id: parkingZoneId },
    });
    return parkingZone?.dataValues;
  }

  async createParkingZone(
    parkingZone: ParkingZoneInput
  ): Promise<IParkingZone> {
    try {
      const data = await ParkingZone.create(
        parkingZone as unknown as Omit<any, string>
      );

      return data.dataValues;
    } catch (error) {
      throw {
        statusCode: 400,
        message: "Parking zone with this name already exists.",
      };
    }
  }

  async updateParkingZone(
    parkingZoneId: number,
    parkingZone: ParkingZoneInput
  ) {
    const foundParkingZone = await ParkingZone.findByPk(parkingZoneId);

    if (!foundParkingZone) {
      const error = new Error("Could not find parking zone.");
      // @ts-ignore
      error.statusCode = 404;
      throw error;
    }
    await ParkingZone.update(
      { ...parkingZone },
      {
        where: {
          id: parkingZoneId,
        },
      }
    );
  }

  async deleteParkingZone(parkingZoneId: number) {
    const foundParkingZone = await ParkingZone.findByPk(parkingZoneId);

    if (!foundParkingZone) {
      const error = new Error("Could not find parking zone.");
      // @ts-ignore
      error.statusCode = 404;
      throw error;
    }

    await ParkingZone.destroy({
      where: {
        id: parkingZoneId,
      },
    });
  }
}

export default new ParkingZoneRepository();
