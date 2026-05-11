import { useState } from "react";
import "./Login.css";
import api from "../services/api";

function Login({ setPage }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await api.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      window.location.reload();

    } catch (error) {

      alert("Login Failed");

    }
  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h1 className="login-title">
          Login to Your Account
        </h1>

        <div className="input-box">

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        <div className="input-box">

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="bottom-text">

          New User?{" "}

          <span onClick={() => setPage("signup")}>
            Signup
          </span>

        </p>

      </div>

    </div>
  );
}

export default Login;