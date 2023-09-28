import express from "express";
import { validationResult } from "express-validator";
import { RequestWithUser } from "../repositories/user.repository";
import ParkingZoneService from "../services/parkingZone.service";

class AdminController {
  async createParkingZone(
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      if (request.user?.role !== "Admin") {
        throw {
          statusCode: 401,
          message: "Unauthorized",
        };
      }

      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        const error = new Error("Validation failed.") as any;
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }

      const { name, address, rate } = request.body;

      const parkingZone = await ParkingZoneService.createParkingZone(
        name,
        address,
        rate
      );

      return response
        .status(201)
        .json({ status: "success", data: parkingZone });
    } catch (error) {
      next(error);
    }
  }
}

export default new AdminController();
