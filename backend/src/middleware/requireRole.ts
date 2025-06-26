import { Request, Response, NextFunction } from "express";

// Extend Express Request type to include `user`
interface RequestWithUser extends Request {
  user?: {
    id: string;
    role: "admin" | "user";
    // Add other fields if needed (e.g., email, name)
  };
}

export const requireRole = (role: "admin" | "user") => {
  return (req: RequestWithUser, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== role) {
      res.status(403).json({ error: "Access denied" });
      return;
    }
    next();
  };
};
