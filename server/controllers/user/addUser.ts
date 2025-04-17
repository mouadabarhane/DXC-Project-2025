import { Request, Response } from "express";
import { User, validation } from "../../models/user/user";
import bcrypt from "bcryptjs";

export default async function addUser(req: Request, res: Response) {
  try {
    // console.log("request "+req.body.userID);
    const { error } = validation(req.body);

    if (error) {
      return res.status(400).send({ message: error.message });
    }
    const user = await User.findOne({ userID: req.body.userID });
    if (user) {
      return res
        .status(409)
        .send({ message: "User with given userID already exists !" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT_KEY));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).send({ message: "Internal server Error - users" });
    console.log("error : " + error);
  }
}
