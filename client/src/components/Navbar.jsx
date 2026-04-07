import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "15px 30px", background: "#0d6efd", color: "white" }}>
      <h2>Hospital MS</h2>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/">Dashboard</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/patients">Patients</Link>
        <Link to="/appointments">Appointments</Link>
        <button onClick={logoutHandler}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;