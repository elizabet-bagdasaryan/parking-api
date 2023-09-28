import express from "express";
import { body } from "express-validator";
import AdminController from "../controllers/admin.controller";

const router = express.Router();

router.post(
  "/parking-zone",
  [
    body("name").exists().trim().not().isEmpty(),
    body("address").exists().trim().not().isEmpty(),
    body("rate").exists().trim().not().isEmpty().isNumeric(),
  ],
  AdminController.createParkingZone
);

router.get("/parking-history", AdminController.getParkingZoneHistory);

export default router;
