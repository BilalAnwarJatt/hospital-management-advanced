import express from "express";
import Doctor from "../models/Doctor.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create doctor
router.post("/", protect, async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all doctors
router.get("/", protect, async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get doctor by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update doctor
router.put("/:id", protect, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(doctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete doctor
router.delete("/:id", protect, async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;