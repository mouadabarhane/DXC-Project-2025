import { Request, Response } from "express";
import { User } from "../../models/user/user";
import bcrypt from "bcryptjs";
import Joi from "joi";

export default async function authUser(req: Request, res: Response) {
  const validate = (data) => {
    const schema = Joi.object({
      userID: Joi.string().required().label("userID"),
      password: Joi.string().required().label("Password"),
    });
    return schema.validate(data);
  };

  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.message });
    }

    const user = await User.findOne({ userID: req.body.userID });
    if (!user) {
      return res.status(401).send({ message: "Invalid UserID !!" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Password !!" });
    }
    // console.log(user);

    if (user.profile == "Administrator") {
      const token = user.generateAuthToken();
      res.status(200).send({
        data: token,
        user: user,
        message: `Login successful for ${user.profile}`,
      });
    }
    if (user.profile == "Commercial Agent") {
      const token = user.generateAuthToken();
      res.status(200).send({
        data: token,
        user: user,
        message: `Login successful for ${user.profile}`,
      });
    }

    if (user.profile == "Product Offering Manager") {
      const token = user.generateAuthToken();
      res.status(200).send({
        data: token,
        user: user,
        message: `Login successful for ${user.profile}`,
      });
    }

    if (
      user.profile != "Administrator" &&
      user.profile != "Commercial Agent" &&
      user.profile != "Product Offering Manager"
    ) {
      res.status(401).send({
        message: "Profile Unauthorized",
      });
    }
    // res.send(users)
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message + " - " + req.body });
  }
}
