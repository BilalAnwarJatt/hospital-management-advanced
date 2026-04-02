import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";

// Admin Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    
    const scheduledAppointments = await Appointment.countDocuments({ status: "scheduled" });
    const completedAppointments = await Appointment.countDocuments({ status: "completed" });
    const cancelledAppointments = await Appointment.countDocuments({ status: "cancelled" });

    res.status(200).json({
      success: true,
      data: {
        totalDoctors,
        totalPatients,
        totalAppointments,
        scheduledAppointments,
        completedAppointments,
        cancelledAppointments,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};