import express from "express";
import {
  getVaccinations,
  createVaccination,
  updateVaccination,
  deleteVaccination,
  getVaccinationStats,
} from "../controllers/vaccinationController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getVaccinations).post(createVaccination);

router.route("/stats").get(getVaccinationStats);

router.route("/:id").put(updateVaccination).delete(deleteVaccination);

export default router;
