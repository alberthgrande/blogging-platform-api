import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";

const service = new AuthService();

export class AuthController {
  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password } = req.body;
    try {
      const user = await service.register(email, password);
      res.status(201).json({ user });
    } catch (err) {
      res.status(400).json({ error: "User already exists or invalid data." });
    }
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { email, password } = req.body;
    const token = await service.login(email, password);

    if (!token) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    res.json({ token });
  };
}
