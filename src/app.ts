import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/post.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5500", // 👈 frontend origin
    credentials: true, // 👈 allow cookies
  })
);
app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

export default app;
