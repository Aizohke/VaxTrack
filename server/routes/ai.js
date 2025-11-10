import express from "express";
import {
  handleAIChat,
  getVaccineRecommendations,
} from "../controllers/aiController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.post("/chat", handleAIChat);
router.post("/recommendations", getVaccineRecommendations);

export default router;
