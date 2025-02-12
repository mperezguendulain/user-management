import express from "express";
import {
  getUsersController,
  updateUserController,
  deleteUserController,
  addUserController,
  getAuthenticatedUser
} from "../controllers/userController";

// Middlewares
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

router.get("/me", getAuthenticatedUser);

router.get("/users", getUsersController);
router.post("/users", addUserController);
router.put("/users/:id", updateUserController);
router.delete("/users/:id", deleteUserController);

export default router;
