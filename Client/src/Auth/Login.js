import axios from "axios";
import React, { useState } from "react";
import "../CSS/FormsCSS/Form.css";

const URL = process.env.REACT_APP_proxy;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleLogin = () => {
    axios
      .post(`${URL}/login`, {
        email,
        password,
      })
      .then((res) => {
        if (res.data.error) {
          setError(res.data.error);
        } else {
          localStorage.setItem("token", res.data.token);
          if (res.data.depart) {
            localStorage.setItem("departement", JSON.stringify(res.data.depart));
          }
          window.location.href = "/Dashboard";
        }
      });
  };

  const checkEmail = (_email) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(_email)) {
      setError("Email is not valid!");
    } else {
      setError("");
    }
  };

  return (
    <div className="form">
      <h3>Log-in</h3>
      <label htmlFor="email" className="form-label">
        Email :
      </label>
      <input
        type="email"
        placeholder="Email"
        className="form-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={(e) => checkEmail(e.target.value)}
      />

      <label htmlFor="password" className="form-label">
        Password :
      </label>
      <input
        type="password"
        placeholder="Password"
        className="form-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="form-button" type="button" onClick={handleLogin}>
        Log In
      </button>
      {error && <p className="Error">{error}</p>}
   
      <a href={`${URL}/google`}>
        <button type="button">
          <img
            src="https://developers.google.com/identity/images/btn_google_signin_dark_normal_web.png"
            alt="Sign in"
          />
        </button>
      </a>
    </div>
  );
}