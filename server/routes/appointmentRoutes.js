import express from "express";
import Appointment from "../models/Appointment.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create appointment
router.post("/", protect, async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all appointments
router.get("/", protect, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email")
      .populate("doctor", "name email");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get appointment by ID
router.get("/:id", protect, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "name email")
      .populate("doctor", "name email");
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update appointment
router.put("/:id", protect, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete appointment
router.delete("/:id", protect, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;