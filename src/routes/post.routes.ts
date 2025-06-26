import { Router } from "express";
import { PostController } from "../controllers/PostController";
import { authMiddleware } from "../middleware/authMiddleware";
import { requireRole } from "../middleware/requireRole";

const router = Router();
const controller = new PostController();

router.get("/", authMiddleware, controller.getPosts.bind(controller));
router.get("/:id", authMiddleware, controller.getPost.bind(controller));
router.post("/", authMiddleware, controller.createPost.bind(controller));
router.put("/:id", authMiddleware, controller.updatePost.bind(controller));
router.delete(
  "/:id",
  authMiddleware,
  requireRole("admin"), // ✅ Role-based protection
  controller.deletePost.bind(controller)
);

export default router;
