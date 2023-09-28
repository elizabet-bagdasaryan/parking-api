import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 100,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Customer",
  },
});
