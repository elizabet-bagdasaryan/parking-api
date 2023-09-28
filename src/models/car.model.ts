import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";
import { User } from "./user.model";

export const Car = sequelize.define("Car", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
});

User.hasMany(Car);
Car.belongsTo(User);
