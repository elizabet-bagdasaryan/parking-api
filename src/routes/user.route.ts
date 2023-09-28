import express from "express";
import { body } from "express-validator";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").exists().trim().not().isEmpty(),
    body("email")
      .exists()
      .trim()
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password").exists().trim().not().isEmpty(),
  ],
  UserController.register
);

router.post(
  "/login",
  [
    body("email")
      .exists()
      .trim()
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
    body("password").exists().trim().not().isEmpty(),
  ],
  UserController.login
);

router.post(
  "/reset-password",
  [
    body("email")
      .exists()
      .trim()
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail(),
  ],
  UserController.resetPassword
);

router.post(
  "/add-car",
  [
    body("brand").exists().trim().not().isEmpty(),
    body("number").exists().trim().not().isEmpty(),
    body("type").exists().trim().not().isEmpty(),
    body("year").exists().trim().not().isEmpty().isNumeric(),
  ],
  UserController.addCar
);

export default router;
