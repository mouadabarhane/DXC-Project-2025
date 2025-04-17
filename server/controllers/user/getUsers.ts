import { Request, Response } from "express";
import { User } from "../../models/user/user";

export default async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.find({});

    if (!users) {
      return res.status(401).send({ message: "Data not Found" });
    }

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server Error - error while getting Data" });
    console.log("error : " + error);
  }
}
