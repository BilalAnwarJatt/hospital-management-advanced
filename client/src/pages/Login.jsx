import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const changeHandler = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);
      login(data);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form
        onSubmit={submitHandler}
        style={{ display: "flex", flexDirection: "column", gap: "15px", width: "300px", padding: "30px", border: "1px solid #ccc", borderRadius: "10px" }}
      >
        <h2>Login</h2>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={changeHandler} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={changeHandler} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;