import { Router } from "express";
import { PostController } from "../controllers/PostController";

const router = Router();
const controller = new PostController();

router.get("/", controller.getPosts.bind(controller));
router.get("/:id", controller.getPost.bind(controller));
router.post("/", controller.createPost.bind(controller));
router.put("/:id", controller.updatePost.bind(controller));
router.delete("/:id", controller.deletePost.bind(controller));

export default router;
