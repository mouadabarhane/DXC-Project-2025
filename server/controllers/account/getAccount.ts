import { Request, Response } from "express";
import AccountModel from "../../models/account/account";

export default async function getAccount(req: Request, res: Response) {
  try {
    const accounts = await AccountModel.find({});

    res.setHeader("Content-Type", "application/json");
    res.setHeader("x-Total-Count", accounts.length);
    res.status(200).send(JSON.stringify(accounts));
  } catch (error) {
    console.error("Error retrieving product orders:", error);
    res.status(500).send("Internal Server Error");
  }
}
