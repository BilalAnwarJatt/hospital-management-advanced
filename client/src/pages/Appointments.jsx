import { useState, useEffect } from "react";
import API from "../services/api";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [date, setDate] = useState("");

  const fetchAppointments = async () => {
    try {
      const { data } = await API.get("/appointments");
      setAppointments(data);
    } catch (error) {
      alert(error.response?.data?.message || "Error fetching appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const addAppointment = async (e) => {
    e.preventDefault();
    try {
      await API.post("/appointments", { patientName, doctorName, date });
      setPatientName(""); setDoctorName(""); setDate("");
      fetchAppointments();
    } catch (error) {
      alert(error.response?.data?.message || "Error adding appointment");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Appointments</h1>

      <form onSubmit={addAppointment} style={{ marginBottom: "20px" }}>
        <input placeholder="Patient Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
        <input placeholder="Doctor Name" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} required />
        <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} required />
        <button type="submit">Add Appointment</button>
      </form>

      <ul>
        {appointments.map((a) => (
          <li key={a._id}>
            {a.patientName} with {a.doctorName} at {a.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointments;