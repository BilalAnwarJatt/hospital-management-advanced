import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const changeHandler = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          width: "300px",
          padding: "30px",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
        onSubmit={submitHandler}
      >
        <h2>Login</h2>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={changeHandler} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={changeHandler} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;