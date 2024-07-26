import { RequestHandler } from "express";
import User from "../models/User";
import { comparePassword, generateToken, hashPassword } from "../utils/auth";

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Request Body:", req.body);

    const existingUser = await User.findOne({ email });
    console.log("Existing User:", existingUser);

    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const hashedPassword = await hashPassword(password);
    console.log("Hashed Password:", hashedPassword);

    const user = new User({ email, password: hashedPassword });
    console.log("New User Instance:", user);

    await user.save();
    console.log("User Saved:", user);

    const token = generateToken(user._id.toString());
    console.log("Generated Token:", token);

    const loginUser = {
      _id: user._id,
      email: user.email,
    };

    return res.status(201).json({ token, loginUser });
  } catch (error) {
    console.error("Error:", error);
    return res.status(404).json({ message: "Não foi possivel criar o usuário" });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email ou senha incorretos!" });
    }

    //COMPARE PASSWORDS
    const comparePasswordHash = await comparePassword(password, user!.password);

    if (!comparePasswordHash) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    //GENERATE TOKEN
    const token = generateToken(user!._id.toString());

    const loginUser = {
      _id: user._id,
      email: user.email,
    };
    return res.status(200).json({ token, loginUser });
  } catch (error) {
    return res.status(404).json({ message: "Não foi possível fazer login" });
  }
};
