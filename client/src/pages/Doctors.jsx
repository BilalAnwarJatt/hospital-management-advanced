import { useState, useEffect } from "react";
import API from "../services/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");

  // Fetch doctors
  const fetchDoctors = async () => {
    try {
      const { data } = await API.get("/doctors");
      setDoctors(data);
    } catch (error) {
      alert(error.response?.data?.message || "Error fetching doctors");
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Add doctor
  const addDoctor = async (e) => {
    e.preventDefault();
    try {
      await API.post("/doctors", { name, specialization });
      setName("");
      setSpecialization("");
      fetchDoctors();
    } catch (error) {
      alert(error.response?.data?.message || "Error adding doctor");
    }
  };

  // Delete doctor
  const deleteDoctor = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/doctors/${id}`);
      fetchDoctors();
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting doctor");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Doctors</h1>

      <form onSubmit={addDoctor} style={{ marginBottom: "20px" }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
        <button type="submit">Add Doctor</button>
      </form>

      <ul>
        {doctors.map((doc) => (
          <li key={doc._id}>
            {doc.name} - {doc.specialization}{" "}
            <button onClick={() => deleteDoctor(doc._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Doctors;