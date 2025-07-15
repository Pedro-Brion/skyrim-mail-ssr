import { Router } from "express";
import { MessagesController } from "../controllers/messages.controller";

const router = Router();

router.use("/", MessagesController.getMessages);

export default router;
