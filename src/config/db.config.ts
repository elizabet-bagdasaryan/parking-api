import { Sequelize } from "sequelize";

// for local development
// export const sequelize = new Sequelize(
//   "postgres://postgres:postgres@localhost/postgres",
//   {
//     dialect: "postgres",
//   }
// );

export const sequelize = new Sequelize("postgres", "postgres", "password", {
  dialect: "postgres",
  host: "postgresql",
});
