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

    // Send refresh token as HTTP-only cookie
    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken: token.accessToken });
  };

  refreshToken = (req: Request, res: Response): void => {
    const token = req.cookies.refreshToken;
    if (!token) {
      res.status(401).json({ error: "No refresh token" });
      return;
    }

    const payload = service.verifyRefreshToken(token);
    if (!payload) {
      res.status(403).json({ error: "Invalid refresh token" });
      return;
    }

    const newAccessToken = service.generateAccessToken(
      payload.id,
      payload.role
    );
    res.json({ accessToken: newAccessToken });
  };

  async logout(req: Request, res: Response) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ message: "Logged out successfully" });
  }
}
