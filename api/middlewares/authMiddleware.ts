import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/envConfig";
import { VercelRequest, VercelResponse } from "@vercel/node";

export const verifyToken = (
  req: VercelRequest,
  res: VercelResponse,
  next: () => void
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const verified = jwt.verify(token, config.jwtSecret) as JwtPayload & {
      userId: number;
    };
    if (verified) {
      next();
    } else {
      return res.status(401).json({ error: "Access denied" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};
