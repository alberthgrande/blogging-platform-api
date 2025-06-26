import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/post.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/posts", postRoutes);

export default app;
