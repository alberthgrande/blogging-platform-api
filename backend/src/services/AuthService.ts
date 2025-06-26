import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import RefreshTokenModel from "../models/RefreshToken";

interface TokenPayload {
  id: string;
  role?: string;
}

export class AuthService {
  // Register a new user
  async register(email: string, password: string): Promise<IUser> {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role: "user" });
    return await user.save();
  }

  // Login user and issue tokens
  async login(
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    const user = await User.findOne({ email }).exec();
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    const userId = user._id.toString();
    const accessToken = this.generateAccessToken(userId, user.role);
    const refreshToken = this.generateRefreshToken(userId);

    // Clear old tokens (optional but recommended)
    await RefreshTokenModel.deleteMany({ userId });

    // Save new refresh token
    await RefreshTokenModel.create({ userId, token: refreshToken });

    return { accessToken, refreshToken };
  }

  // Generate access token with user role
  generateAccessToken(userId: string, role: string): string {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });
  }

  // Generate refresh token
  generateRefreshToken(userId: string): string {
    return jwt.sign({ id: userId }, process.env.REFRESH_SECRET!, {
      expiresIn: "7d",
    });
  }

  // Verify refresh token
  verifyRefreshToken(token: string): { id: string; role: string } | null {
    try {
      const decoded = jwt.verify(token, process.env.REFRESH_SECRET!) as {
        id: string;
        role: string;
      };
      return decoded;
    } catch {
      return null;
    }
  }

  // Refresh the access token using a valid refresh token
  async refreshAccessToken(refreshToken: string): Promise<string | null> {
    const payload = this.verifyRefreshToken(refreshToken);
    if (!payload) return null;

    // Ensure token exists in DB
    const exists = await RefreshTokenModel.findOne({ token: refreshToken });
    if (!exists) return null;

    const user = await User.findById(payload.id);
    if (!user) return null;

    const newAccessToken = this.generateAccessToken(
      user._id.toString(),
      user.role
    );
    return newAccessToken;
  }

  // Logout: delete refresh token from DB
  async logout(refreshToken: string): Promise<void> {
    await RefreshTokenModel.deleteOne({ token: refreshToken });
  }
}
