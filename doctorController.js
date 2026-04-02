import Doctor from "../models/Doctor.js";

// Add doctor
export const addDoctor = async (req, res) => {
  try {
    const { name, specialization, experience, fee } = req.body;
    if (!name || !specialization) {
      return res.status(400).json({ success: false, message: "Name & specialization required" });
    }
    const doctor = await Doctor.create({ name, specialization, experience, fee });
    res.status(201).json({ success: true, message: "Doctor added", data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get doctors
export const getDoctors = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const query = search ? { name: { $regex: search, $options: "i" } } : {};
    const total = await Doctor.countDocuments(query);
    const doctors = await Doctor.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.status(200).json({ success: true, data: doctors, total, page: parseInt(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};