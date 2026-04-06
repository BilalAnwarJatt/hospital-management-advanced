import express from "express";
import Patient from "../models/Patient.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Only Admin can create patient
router.post("/", protect, authorize("admin"), async (req, res) => {
  const patient = await Patient.create(req.body);
  res.status(201).json(patient);
});

// Admin & Doctor can view all patients
router.get("/", protect, authorize("admin", "doctor"), async (req, res) => {
  const patients = await Patient.find().populate("doctor", "name email");
  res.json(patients);
});

// Patient can view own record, Admin & Doctor can view any
router.get("/:id", protect, async (req, res) => {
  const patient = await Patient.findById(req.params.id).populate(
    "doctor",
    "name email"
  );
  if (!patient) return res.status(404).json({ message: "Patient not found" });

  if (
    req.user.role === "patient" &&
    patient._id.toString() !== req.user._id.toString()
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json(patient);
});

export default router;