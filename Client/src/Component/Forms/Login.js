import axios from "axios";
import React, { useState } from "react";
import "./FormsCSS/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let proxy = process.env.REACT_APP_proxy;
  const HandleLogin = () => {
    axios.post(`${proxy}/login`, {
        email: email,
        password: password
      })
      .then((res) => {
        if (res.data["error"]) {
          document.getElementById("error").innerHTML = res.data["error"];
        } else {
          localStorage.setItem("jwt", res.data.token);
            localStorage.setItem("role", res.data.role);
            
        }
      });

  };
  const CheckEmail = (_email) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(_email)) {
      document.getElementById("error").innerHTML = "Email is not valid!";
    } else {
      document.getElementById("error").innerHTML = "";
    }
  };

    return (
        <div className="login">
            <div className="loginRight">
                <div className="loginBox">
                    <h3>Log-in</h3>
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        placeholder="Email"
                        className="loginInput"
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={(e) => CheckEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password :</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="loginInput"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="loginButton" onClick={HandleLogin}>
                        Log In
                    </button>
                    <p id="error"></p>
                    {/* <button className="loginRegisterButton">
                            <Link className="link" to="/register">Create a New Account</Link>
                        </button> */}
                </div>
            </div>
        </div>
    );
}
