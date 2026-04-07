import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";

function App() {
  const token = localStorage.getItem("token");

  return (
    <>
      {token && <Navbar />}
      <Routes>
        <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors" element={token ? <Doctors /> : <Navigate to="/login" />} />
        <Route path="/patients" element={token ? <Patients /> : <Navigate to="/login" />} />
        <Route path="/appointments" element={token ? <Appointments /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;