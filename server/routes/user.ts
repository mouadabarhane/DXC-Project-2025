import { Router } from "express";
import {
  addUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  authUser,
  getSimilarProfiles,
} from "../controllers/user";

const userRoute = Router();

userRoute.post("/login", authUser);

userRoute.get("/", getUsers);

userRoute.get("/:id", getUserById);

userRoute.post("/", addUser);

userRoute.get("/similar-profile/:profile", getSimilarProfiles);

userRoute.patch("/:id", updateUser);

userRoute.delete("/:id", deleteUser);

export default userRoute;
