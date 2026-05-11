import { useState } from "react";
import "./signup.css";
import api from "../services/api";

function Signup({ setPage }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    try {

      await api.post("/users/signup", {
        name,
        email,
        password,
      });

      alert("Signup Successful");

      setPage("login");

    } catch (error) {

      alert("Signup Failed");

    }
  };

  return (

    <div className="signup-container">

      <div className="signup-box">

        <h1 className="signup-title">
          Create Your Account
        </h1>

        <div className="input-box">

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

        </div>

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

        <button className="signup-btn" onClick={handleSignup}>
          Signup
        </button>

        <p className="bottom-text">

          Already have an account?{" "}

          <span onClick={() => setPage("login")}>
            Login
          </span>

        </p>

      </div>

    </div>
  );
}

export default Signup;