import axios from 'axios';
import React, { useState } from "react";
import { Link } from 'react-router-dom'
import './FormsCSS/login.css'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let API_DATABASE = process.env.REACT_APP_API_DATABASE;
    const HandleLogin = () => {
        axios.post(`${API_DATABASE}/login`, {
            email: email,
            password: password
        }).then((res) => {
            console.log(res)
        }
        )
    }
    const CheckEmail = (_email) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(_email)) {
            document.getElementById("error").innerHTML = "Email is not valid!"
        }
        else {
            document.getElementById("error").innerHTML = ""
        }
    }


    return (
        <div className="login">
                    
                <div className="loginRight">
                    <div className="loginBox">
                        <h3>Log-in</h3>
                        <label htmlFor="email">Email :</label>
                        <input type="email" placeholder="Email" className="loginInput" onChange={setEmail} onBlur={(e) => CheckEmail(e.target.value)} />
                        <p id="error"></p>
                        <label htmlFor="password">Password :</label>
                        <input type="password" placeholder="Password" className="loginInput" onChange={setPassword} />
                        <button className="loginButton" onClick={HandleLogin} 
                        >Log In</button>
                        {/* <button className="loginRegisterButton">
                            <Link className="link" to="/register">Create a New Account</Link>
                        </button> */}
                    </div>
        </div>
        </div>
    )
}
