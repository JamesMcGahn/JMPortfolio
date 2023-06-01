import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User.js";
import { getSession } from "next-auth/react";

export default async function signUp(req, res) {
  const session = await getSession({ req });
  if (session) {
    if (req.method == "POST") {
      const { username, password } = req.body;
      await dbConnect();

      const userFound = await User.findOne({ username });
      if (userFound) {
        return res.status(500).json({ success: "User Already Exists" });
      }

      const user = new User({ username, password });
      await user.save();
      return res.status(200).json({ success: "true" });
    }
  } else {
    res.status(500).json({ message: "Not valid" });
  }
}
