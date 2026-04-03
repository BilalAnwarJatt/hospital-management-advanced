import Patient from "../models/Patient.js";

// Add patient
export const addPatient = async (req, res) => {
  try {
    const { name, age, gender, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, message: "Name & phone required" });
    }
    const patient = await Patient.create({ name, age, gender, phone });
    res.status(201).json({ success: true, message: "Patient added", data: patient });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get patients
export const getPatients = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const query = search ? { name: { $regex: search, $options: "i" } } : {};
    const total = await Patient.countDocuments(query);
    const patients = await Patient.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.status(200).json({ success: true, data: patients, total, page: parseInt(page) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};