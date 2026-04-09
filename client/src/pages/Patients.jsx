import { useState, useEffect } from "react";
import API from "../services/api";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const fetchPatients = async () => {
    try {
      const { data } = await API.get("/patients");
      setPatients(data);
    } catch (error) {
      alert(error.response?.data?.message || "Error fetching patients");
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const addPatient = async (e) => {
    e.preventDefault();
    try {
      await API.post("/patients", { name, age });
      setName(""); setAge("");
      fetchPatients();
    } catch (error) {
      alert(error.response?.data?.message || "Error adding patient");
    }
  };

  const deletePatient = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/patients/${id}`);
      fetchPatients();
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting patient");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Patients</h1>

      <form onSubmit={addPatient} style={{ marginBottom: "20px" }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <button type="submit">Add Patient</button>
      </form>

      <ul>
        {patients.map((p) => (
          <li key={p._id}>
            {p.name} - {p.age}{" "}
            <button onClick={() => deletePatient(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Patients;