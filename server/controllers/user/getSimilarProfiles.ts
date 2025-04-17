import { User } from "../../models/user/user";

export default async function getSimilarProfiles(req, res) {
  try {
    const profile = req.params.profile;
    const users = await User.find({ profile: profile });

    if (users.length > 0) {
      return res.status(200).json(users);
    }

    res.status(404).json({ message: "No similar profiles found" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error - error while getting similar profiles",
    });
  }
}
