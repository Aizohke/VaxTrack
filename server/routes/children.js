import express from "express";
import {
  getChildren,
  getChild,
  createChild,
  updateChild,
  deleteChild,
} from "../controllers/childController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All routes are protected
router.use(protect);

router.route("/").get(getChildren).post(createChild);

router.route("/:id").get(getChild).put(updateChild).delete(deleteChild);

export default router;
