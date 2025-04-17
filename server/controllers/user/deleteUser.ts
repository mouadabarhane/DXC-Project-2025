import { Request, Response } from "express";
import { User } from "../../models/user/user";

export default async function deleteUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (userId) {
      return res
        .status(200)
        .json({ message: "User_id number : " + userId + " has been deleted." });
    }
    res.status(404).send({ message: "User not found" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server Error - error while deleting record" });
    console.log("error : " + error);
  }
}
