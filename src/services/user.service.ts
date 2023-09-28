import {
  confirmUserToken,
  createUser,
  resetPassword,
  signIn,
} from "../config/firebase.config";
import CarRepository from "../repositories/car.repository";
import ParkingZoneRepository from "../repositories/parkingZone.repository";
import ParkingZoneCarsRepository, {
  IParkingZoneCars,
} from "../repositories/parkingZoneCars.repository";
import UserRepository, { IUser } from "../repositories/user.repository";

class UserService {
  async createUser(
    email: string,
    password: string,
    name: string,
    role?: string
  ) {
    const token = await createUser(email, password);

    await UserRepository.createUser({
      email,
      name,
      role,
    });

    return token;
  }

  async confirmUserToken(token: string) {
    const user = await confirmUserToken(token);

    const foundUser = await UserRepository.getUserByEmail(
      user!.email as string
    );

    return foundUser;
  }

  async login(email: string, password: string) {
    const token = await signIn(email, password);

    return token;
  }

  async resetPassword(email: string) {
    await resetPassword(email);
  }

  async parkCar(carId: number, parkingZoneId: number, userId: number) {
    const foundCar = await CarRepository.getCar(carId);

    if (!foundCar) {
      throw {
        statusCode: 400,
        message: "Car with that id not found",
      };
    }

    if (foundCar.UserId !== userId) {
      throw {
        statusCode: 403,
        message: "You can not park other users car",
      };
    }

    const foundParkingZone = await ParkingZoneRepository.getParkingZone(
      parkingZoneId
    );

    if (!foundParkingZone) {
      throw {
        statusCode: 400,
        message: "Parking Zone with that id not found",
      };
    }

    await ParkingZoneCarsRepository.createParkingZoneCars({
      isParked: true,
      ParkingZoneId: parkingZoneId,
      CarId: carId,
    });
  }

  async unparkCar(carId: number, userId: number) {
    const foundCar = await CarRepository.getCar(carId);

    if (!foundCar) {
      throw {
        statusCode: 400,
        message: "Car with that id not found",
      };
    }

    if (foundCar.UserId !== userId) {
      throw {
        statusCode: 403,
        message: "You can not unpark other users car",
      };
    }

    const foundParkingZoneCar = (await ParkingZoneCarsRepository.find(carId))
      .dataValues as IParkingZoneCars;

    const foundParkingZone = await ParkingZoneRepository.getParkingZone(
      foundParkingZoneCar.ParkingZoneId
    );

    const hoursOnParking =
      (Date.now() - foundParkingZone.createdAt.getTime()) / 3600000;

    const charge = +(hoursOnParking * foundParkingZone.rate).toFixed(2);

    const user = await UserRepository.getUser(userId);

    if (user.balance < charge) {
      throw {
        statusCode: 400,
        message:
          "You can not unpark this car as you do not have enough money on your balance",
      };
    }

    const balance = user.balance - charge;

    await ParkingZoneCarsRepository.unparkParkingZoneCars(carId);

    await UserRepository.updateUser(userId, {
      balance,
    });

    return {
      charged: charge,
      remaining: balance,
    };
  }

  async getParkingHistory(userId: number) {
    const userCarIds = (await CarRepository.getUserCars(userId)).map(
      (item) => item.id
    );

    if (!userCarIds.length) {
      return [];
    }

    const history = await ParkingZoneCarsRepository.getByCarIds(userCarIds);

    return history;
  }
}

export default new UserService();
