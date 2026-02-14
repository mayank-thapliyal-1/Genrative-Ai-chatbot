import express from "express";
import { chatHandler, getHistory, getSessions } from "../controllers/chatControllers.js";

const router = express.Router();

router.post("/chat", chatHandler);
router.get("/history/:sessionId", getHistory);
router.get("/sessions", getSessions);
export default router;