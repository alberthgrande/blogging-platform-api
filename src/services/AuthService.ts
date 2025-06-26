import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

export class AuthService {
  async register(email: string, password: string): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    return await user.save();
  }

  generateAccessToken(userId: string, role: string): string {
    return jwt.sign({ id: userId, role }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });
  }

  generateRefreshToken(userId: string): string {
    return jwt.sign({ id: userId }, process.env.REFRESH_SECRET!, {
      expiresIn: "7d",
    });
  }

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

    return { accessToken, refreshToken };
  }

  verifyRefreshToken(token: string): { id: string; role: string } | null {
    try {
      return jwt.verify(token, process.env.REFRESH_SECRET!) as {
        id: string;
        role: string;
      };
    } catch {
      return null;
    }
  }
}
