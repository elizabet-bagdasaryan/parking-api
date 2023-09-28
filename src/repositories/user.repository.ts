import express from "express";
import { sequelize } from "../config/db.config";
import { User } from "../models/user.model";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInput {
  name: string;
  email: string;
  role?: string;
}

export interface RequestWithUser extends express.Request {
  user?: IUser;
}

class UserRepository {
  db = {};

  constructor() {
    this.db = sequelize;
  }

  async getUserByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async createUser(user: UserInput) {
    const data = await User.create(user as unknown as Omit<any, string>);
    return data;
  }

  async updateUser(userId: string, updates: { password: string }) {
    const foundUser = await User.findByPk(userId);

    if (!foundUser) {
      const error = new Error("Could not find user.");
      // @ts-ignore
      error.statusCode = 404;
      throw error;
    }
    await User.update(
      { ...updates },
      {
        where: {
          id: userId,
        },
      }
    );
  }
}

export default new UserRepository();
