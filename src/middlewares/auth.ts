import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const protectedRoute: RequestHandler = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Não autorizado, token falhou" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Não autorizado" });
  }
};
