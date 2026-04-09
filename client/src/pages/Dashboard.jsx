import { useState, useEffect } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({ patients: 0, doctors: 0, appointments: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/dashboard/stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Dashboard</h1>
      <div>Patients: {stats.patients}</div>
      <div>Doctors: {stats.doctors}</div>
      <div>Appointments: {stats.appointments}</div>
    </div>
  );
};

export default Dashboard;