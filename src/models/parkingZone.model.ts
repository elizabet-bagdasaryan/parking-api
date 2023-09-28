import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.config";
import { Car } from "./car.model";

export const ParkingZone = sequelize.define("ParkingZone", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  rate: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export const ParkingZoneCars = sequelize.define("ParkingZoneCars", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  isParked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

ParkingZoneCars.belongsTo(ParkingZone, { foreignKey: "ParkingZoneId" });
ParkingZoneCars.belongsTo(Car, { foreignKey: "CarId" });
