import express from "express";
import Patient from "../models/Patient.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create patient
router.post("/", protect, async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all patients
router.get("/", protect, async (req, res) => {
  try {
    const patients = await Patient.find().populate("doctor", "name email");
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get patient by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("doctor", "name email");
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update patient
router.put("/:id", protect, async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(patient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete patient
router.delete("/:id", protect, async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;