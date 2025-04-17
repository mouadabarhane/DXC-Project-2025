import { Request, Response } from "express";
import { User, validation } from "../../models/user/user";
import bcrypt from "bcryptjs";

export default async function updatePassword(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(id);

    if (!user) {
      res.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      res.status(401).send({ message: "Invalid old password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).send({ message: "Password updated successfully" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).send({
      message: "Internal server error - Error while updating password",
    });
  }
}
