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
      setError(res.data);

      if (res.data.error) {
      } else {
        localStorage.setItem("token", res.data.token);
        if (res.data.depart) {
          localStorage.setItem(
            "departement",
            JSON.stringify(res.data.depart)
          );
        }
        window.location.href = "/Dashboard";
      }
    })
    .catch((err) => {
      console.log(err);
      setError(err.response.data.error);
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

      <a href={`${URL}/google`} className="google-btn">
                <img
            src="https://www.oncrashreboot.com/images/create-apple-google-signin-buttons-quick-dirty-way-google.png"
            alt="Sign in"
          />
      </a>
    </div>
  );
}
