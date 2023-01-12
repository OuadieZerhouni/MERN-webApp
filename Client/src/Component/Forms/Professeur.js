import React, { useState } from "react";
import axios from "axios";

const ProfesseurForm = () => {
  const [professeurCIN, setProfesseurCIN] = useState("");
  const [professeurPhoneNumber, setProfesseurPhoneNumber] = useState("");
  const [professeurFullName, setProfesseurFullName] = useState("");
  const [professeurEmail, setProfesseurEmail] = useState("");
  const [professeurPassword, setProfesseurPassword] = useState("");
  const [professeurRole, setProfesseurRole] = useState("PA");

  let API_DATABASE = process.env.REACT_APP_API_DATABASE;

  const handleInsertProfesseur = () => {
    axios
      .post(API_DATABASE + "/insert/professeur", {
        CIN: professeurCIN,
        PhoneNumber: professeurPhoneNumber,
        FullName: professeurFullName,
        email: professeurEmail,
        password: professeurPassword,
        role: professeurRole,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //virefy emaill 
  const handleEmail = (e) => {
    const email = e;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let Error= document.getElementsByClassName('Error')[0]
    if (emailRegex.test(email)) {
      setProfesseurEmail(email);
      Error.innerHTML=""
    } else {
      Error.innerHTML="Email is not valid"
    }
  }
  return (
    <div className="form">
      <label htmlFor="professeur-cin" className="form-label">
        {" "}
        CIN:{" "}
      </label>
      <input
        className="form-input"
        type="text"
        id="professeur-cin"
        value={professeurCIN}
        onChange={(e) => setProfesseurCIN(e.target.value)}
      />
      <br />
      <label htmlFor="professeur-phone-number" className="form-label">
     
        N° de telephone:
      </label>
      <input
        className="form-input"
        type="text"
        id="professeur-phone-number"
        placeholder="06..."
        value={professeurPhoneNumber}
        onChange={(e) => setProfesseurPhoneNumber(e.target.value)}
      />
      <br />
      <label htmlFor="professeur-full-name" className="form-label">
       
        Nom & prénom:
      </label>
      <input
        className="form-input"
        type="text"
        id="professeur-full-name"
        pattern="[A-Za-z]{1,32}"
        value={professeurFullName}
        onChange={(e) => setProfesseurFullName(e.target.value)}
      />
      <br />
      <label htmlFor="professeur-email" className="form-label">
       
        Email:
      </label>
      <input
        className="form-input"
        type="email"
        id="professeur-email"
        value={professeurEmail}
        onChange={(e) => setProfesseurEmail(e.target.value)}
        onBlur={(e) => handleEmail(e.target.value)}
      />
      <br />
      <label htmlFor="professeur-password" className="form-label">
       
        Mot de Pass:
      </label>
      <input
        className="form-input"
        type="password"
        id="professeur-password"
        value={professeurPassword}
        onChange={(e) => setProfesseurPassword(e.target.value)}
      />
      <br />
      <label htmlFor="professeur-role" className="form-label">
        
        Professeur Role:
      </label>
      <select
        className="form-input"
        id="professeur-role"
        value={professeurRole}
        onChange={(e) => setProfesseurRole(e.target.value)}
      >
        <option value="PA">PA</option>
        <option value="PH">PH</option>
        <option value="PES">PES</option>
      </select>

      <br />
      <div className="Error"></div>
      <button
        className="form-button"
        type="button"
        onClick={handleInsertProfesseur}
      >
        
        Insérer
      </button>
    </div>
  );
};

export default ProfesseurForm;
