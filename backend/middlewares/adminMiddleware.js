import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";

export const protectAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token is provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return res.status(403).json({ message: "Access Denied" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
