import { Router } from "express";
import {
    getAccount,
    getAccountById,
  } from "../controllers/account/";

  const accountRoute = Router();

accountRoute.get("/", getAccount);

accountRoute.get("/:id", getAccountById);


export default accountRoute;