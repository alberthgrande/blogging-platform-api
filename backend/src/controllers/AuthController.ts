import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";
import RefreshTokenModel from "../models/RefreshToken";

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
      secure: process.env.NODE_ENV === "production", // enable only in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return access token in response body
    res.json({ accessToken: token.accessToken });
  };

  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.cookies?.refreshToken;
      if (!token) {
        res.status(401).json({ error: "No refresh token" });
        return;
      }

      const payload = service.verifyRefreshToken(token);
      if (!payload || !payload.id || !payload.role) {
        res.status(403).json({ error: "Invalid refresh token" });
        return;
      }

      const stored = await RefreshTokenModel.findOne({ token });
      if (!stored) {
        res.status(403).json({ error: "Token revoked" });
        return;
      }

      const newAccessToken = service.generateAccessToken(
        payload.id,
        payload.role
      );
      res.json({ accessToken: newAccessToken });
    } catch {
      res.status(403).json({ error: "Invalid refresh token" });
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies?.refreshToken;

    if (token) {
      await RefreshTokenModel.deleteOne({ token });
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ message: "Logged out successfully" });
  };
}
