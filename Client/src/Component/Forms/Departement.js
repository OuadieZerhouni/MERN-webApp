import React, { useState } from "react";
import axios from "axios";


const DepartementForm = () => {
  const [departementNom, setDepartementNom] = useState("");
  const [departementDescription, setDepartementDescription] = useState("");
  const [departementDateCreation, setDepartementDateCreation] = useState("");
  const [departementIdChef, setDepartementIdChef] = useState("");
  const [departementProfesseurs, setDepartementProfesseurs] = useState([]);
  const [departementFilieres, setDepartementFilieres] = useState([]);
  const [responseData, setResponseData] = useState(null);

  let API_DATABASE=process.env.REACT_APP_API_DATABASE;
  const handleInsertDepartement = () => {
    axios
      .post(API_DATABASE+"/insert/departement", {
        Nom: departementNom,
        description: departementDescription,
        Date_Creation: departementDateCreation,
        id_Chef: departementIdChef,
        professeurs: departementProfesseurs,
        Filieres: departementFilieres,
      })
      .then((response) => {
        // response.data stringfy

        setResponseData(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form className="form">
      <label htmlFor="departement-nom" className="form-label">
        Departement Nom:
      </label>
      <input
        className="form-input"
        type="text"
        id="departement-nom"
        value={departementNom}
        onChange={(e) => setDepartementNom(e.target.value)}
      />
      <br />
      <label htmlFor="departement-description" className="form-label">
        Departement Description:
      </label>
      <input
        className="form-input"
        type="text"
        id="departement-description"
        value={departementDescription}
        onChange={(e) => setDepartementDescription(e.target.value)}
      />
      <br />
      <label htmlFor="departement-date-creation" className="form-label">
        Departement Date Creation:
      </label>
      <input
        className="form-input"
        type="text"
        id="departement-date-creation"
        value={departementDateCreation}
        onChange={(e) => setDepartementDateCreation(e.target.value)}
      />
      <br />
      <label htmlFor="departement-id-chef" className="form-label">
        Departement Id Chef:
      </label>
      <input
        className="form-input"
        type="text"
        id="departement-id-chef"
        value={departementIdChef}
        onChange={(e) => setDepartementIdChef(e.target.value)}
      />
      <br />
      <label htmlFor="departement-professeurs" className="form-label">
        Departement Professeurs:
      </label>
      <input
        className="form-input"
        type="text"
        id="departement-professeurs"
        value={departementProfesseurs}
        onChange={(e) => setDepartementProfesseurs(e.target.value)}
      />
      <br />
      <label
        htmlFor="departement-filieres"
        className="
      form-label"
      >
        Departement Filieres:
      </label>
      <input
        className="form-input"
        type="text"
        id="departement-filieres"
        value={departementFilieres}
        onChange={(e) => setDepartementFilieres(e.target.value)}
      />
      <br />
      <button
        type="button"
        onClick={handleInsertDepartement}
        className="departement-form-button"
      >
        Insert Departement
      </button>
      <br />
      <label htmlFor="response-data" className="form-label">
        Response Data:
      </label>
      <textarea id="response-data" value={responseData} readOnly />
    </form>
  );
};

export default DepartementForm;
