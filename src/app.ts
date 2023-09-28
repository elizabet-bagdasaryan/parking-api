import express from "express";
import "./config/firebase.config";
import { sequelize } from "./config/db.config";
import { User } from "./models/user.model";
import { Car } from "./models/car.model";
import { ParkingZone, ParkingZoneCars } from "./models/parkingZone.model";
import UserService from "./services/user.service";
import { RequestWithUser } from "./repositories/user.repository";
import userRouter from "./routes/user.route";
import adminRouter from "./routes/admin.route";
import { resetUsersInFirebase } from "./config/firebase.config";

const port = 8080;

const app: express.Application = express();

app.use(express.json());

app.use(
  async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const userToken = request.headers["user_token"];

      if (!userToken) {
        return next();
      }

      const user = await UserService.confirmUserToken(userToken as string);
      if (!user) {
        throw new Error();
      }

      (request as RequestWithUser).user = user;
      next();
    } catch (error: any) {
      console.log("error ", error);
      response.status(401).json({ message: "Unauthorized" });
    }
  }
);

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);

app.use(
  (
    error: any,
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    console.log("error ", error);
    response.status(status).json({ message: message, data: data });
  }
);

app.listen(port, async () => {
  console.log(`Server is running on ${port}`);

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  await sequelize.sync({ force: true }).then(async () => {
    await resetUsersInFirebase();
    const adminCredentials = { email: "admin@gmail.com", password: "123456" };
    await UserService.createUser(
      adminCredentials.email,
      adminCredentials.password,
      "admin",
      "Admin"
    );
    console.log(
      "--------------------------------------------------------------"
    );
    console.log(
      "Admin user successfully created! Sign in using this credentials:"
    );
    console.log("Email: ", adminCredentials.email);
    console.log("password: ", adminCredentials.password);
    console.log(
      "--------------------------------------------------------------"
    );
  });
});
