import { Request, Response } from "express";
import { User } from "../../models/user/user";

export default async function getUserById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id);

    if (user) {
      return res.status(200).send(user);
    }

    res.status(401).send({ message: "User doesn't exist" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server Error - error while getting user" });
    console.log("error : " + error);
  }
}
