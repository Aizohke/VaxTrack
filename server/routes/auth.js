import express from "express";
import {
  handleClerkWebhook,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Webhook route (no authentication needed for webhooks)
router.post("/webhook", handleClerkWebhook);

// Protected routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

export default router;