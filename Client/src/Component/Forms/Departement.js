import React, { useState, useEffect } from "react";
import axios from "axios";
import ChefModal from "./Modals/ChefModal";
import "./Form.css";

const DepartementForm = () => {
  const [departementNom, setDepartementNom] = useState("");
  const [departementDescription, setDepartementDescription] = useState("");
  const [departementDateCreation, setDepartementDateCreation] = useState("");
  const [departementIdChef, setDepartementIdChef] = useState("");
  const [departementProfesseurs, setDepartementProfesseurs] = useState([]);
  const [departementFilieres, setDepartementFilieres] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [professeurs, setProfesseurs] = useState([]);
  const [ChefModalIsOpen, setChefModalIsOpen] = useState(false);
  const [SelectedChef, setSelectedChef] = useState("Not Selected");

  let API_DATABASE = process.env.REACT_APP_API_DATABASE;

  const handleChefSelection = (chefId) => {
    setDepartementIdChef(chefId[0]); 
    setSelectedChef(chefId[1  ]);
    setChefModalIsOpen(false);
  };
  const toggleChefModal = () => {
    setChefModalIsOpen(!ChefModalIsOpen);
  };

  const handleInsertDepartement = () => {
    axios
      .post(API_DATABASE + "/insert/departement", {
        Nom: departementNom,
        description: departementDescription,
        Date_Creation: departementDateCreation,
        id_Chef: departementIdChef,
        professeurs: departementProfesseurs,
        Filieres: departementFilieres,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios.post(API_DATABASE + "/get/professeur/all").then((response) => {
      setProfesseurs(response.data);
      console.log("from useEffect"+response.data);
    });
  }, [API_DATABASE]);

  return (
    <div>
      <div className="form">
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
          type="Date"
          id="departement-date-creation"
          value={departementDateCreation}
          onChange={(e) => setDepartementDateCreation(e.target.value)}
        />
        <br />
        <label htmlFor="departement-Chef" className="form-label">
        Chef de Departement : 
        </label>
        <button onClick={toggleChefModal} id="departement-Chef" className="Modal-button"> {SelectedChef} </button>
        <ChefModal open={ChefModalIsOpen} toggleModal={toggleChefModal} professeurs={professeurs} handleChefSelection={handleChefSelection}>
          Fancy ChefModal
      </ChefModal>

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
          className="form-button"
        >
          Insert Departement
        </button>       
      </div>
    </div>
  );
};

export default DepartementForm;
