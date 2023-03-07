import axios from "axios";
import React, { useState } from "react";
import "../CSS/FormsCSS/Form.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let URL = process.env.REACT_APP_proxy;
  const HandleLogin = () => {
    axios
      .post(URL+"/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data["error"]) {
          document.getElementById("error").innerHTML = res.data["error"];
        } else {
          localStorage.setItem("token", res.data["token"]);
          const depart=(JSON.stringify(res.data.depart));
          if(res.data.depart)
            localStorage.setItem("departement", depart);
          window.location.href = "/Dashboard";
          
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
    <div className="form">
        <h3>Log-in</h3>
        <label htmlFor="email" className="form-label">
          Email :
        </label>
        <input
          type="email"
          placeholder="Email"
          className="form-input"
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => CheckEmail(e.target.value)}
        />

        <label htmlFor="password" className="form-label">
          Password :
        </label>
        <input
          type="password"
          placeholder="Password"
          className="form-input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-button" type="button" onClick={HandleLogin}>
          Log In
        </button>
        <p id="error" className="Error"></p>
        {/* <button className="loginRegisterButton">
                            <Link className="link" to="/register">Create a New Account</Link>
                        </button> */}
    </div>
  );
}
