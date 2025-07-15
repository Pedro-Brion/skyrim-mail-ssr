import { Router } from "express";
import { MessagesController } from "../controllers/messages.controller.js";

const router: Router = Router();

router.use("/", MessagesController.getMessages);

export default router;
