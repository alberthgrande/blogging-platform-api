import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();
const controller = new AuthController();

router.post("/register", controller.register.bind(controller));
router.post("/login", controller.login.bind(controller));
router.post("/logout", controller.logout.bind(controller));
router.post("/refresh-token", controller.refreshToken.bind(controller));

export default router;
