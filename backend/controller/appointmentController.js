import Appointment from "../models/Appointment.js";

// Book appointment
export const bookAppointment = async (req, res) => {
  try {
    const { patient, doctor, date, reason } = req.body;
    if (!patient || !doctor || !date) {
      return res.status(400).json({ success: false, message: "Patient, doctor, and date required" });
    }
    const appointment = await Appointment.create({ patient, doctor, date, reason });
    res.status(201).json({ success: true, message: "Appointment booked", data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get appointments
export const getAppointments = async (req, res) => {
  try {
    const { status, patientName, doctorName, page = 1, limit = 10 } = req.query;

    let query = {};
    if (status) query.status = status;

    let appointments = await Appointment.find(query)
      .populate("patient", "name age gender phone")
      .populate("doctor", "name specialization fee")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    if (patientName) {
      appointments = appointments.filter(a =>
        a.patient.name.toLowerCase().includes(patientName.toLowerCase())
      );
    }
    if (doctorName) {
      appointments = appointments.filter(a =>
        a.doctor.name.toLowerCase().includes(doctorName.toLowerCase())
      );
    }

    const total = appointments.length;
    res.status(200).json({ success: true, data: appointments, total, page: parseInt(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};