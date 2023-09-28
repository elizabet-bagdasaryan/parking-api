import express from "express";
import { validationResult } from "express-validator";
import UserService from "../services/user.service";
import CarService from "../services/car.service";
import { RequestWithUser } from "../repositories/user.repository";

class UserController {
  async register(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        const error = new Error("Validation failed.") as any;
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }

      const { email, password, name } = request.body;
      const token = await UserService.createUser(email, password, name);

      return response.status(201).json({ status: "success", data: { token } });
    } catch (error) {
      next(error);
    }
  }

  async login(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        const error = new Error("Validation failed.") as any;
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }

      const { email, password } = request.body;
      const token = await UserService.login(email, password);

      return response.status(201).json({ status: "success", data: { token } });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        const error = new Error("Validation failed.") as any;
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }

      const { email } = request.body;
      await UserService.resetPassword(email);

      return response
        .status(201)
        .json({ status: "success", data: "Check your email" });
    } catch (error) {
      next(error);
    }
  }

  async addCar(
    request: RequestWithUser,
    response: express.Response,
    next: express.NextFunction
  ) {
    try {
      if (!request.user) {
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

      const Car = await CarService.createCar(request.body, request.user.id);

      return response.status(201).json({ status: "success", data: Car });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
