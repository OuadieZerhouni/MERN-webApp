import React, { useState, useEffect } from "react";
import axios from "axios";

import ChefModal from "./Modals/ChefModal";
import ProfModal from "./Modals/ProfModal";
import FiliereModal from "./Modals/FileireModal";
import "./FormsCSS/Form.css";

const DepartementForm = () => {

  const [departementNom, setDepartementNom] = useState("");
  const [departementDescription, setDepartementDescription] = useState("");
  const [departementDateCreation, setDepartementDateCreation] = useState("");
  const [departementIdChef, setDepartementIdChef] = useState("");
  const [departementProfesseurs, setDepartementProfesseurs] = useState([]);
  const [departementFilieres, setDepartementFilieres] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [professeurs, setProfesseurs] = useState([]);
  const [SelectedChef, setSelectedChef] = useState("Not Selected");
  const [filieres, setFilieres] = useState([]);


  const [ChefModalIsOpen, setChefModalIsOpen] = useState(false);
  const [ProfModalIsOpen, setProfModalIsOpen] = useState(false);
  const [FiliereModalIsOpen, setFiliereModalIsOpen] = useState(false);

  let API_DATABASE = process.env.REACT_APP_API_DATABASE;
/* Chef Modal handling */
  const handleChefSelection = (chefId) => {
    setDepartementIdChef(chefId[0]); 
    setSelectedChef(chefId[1  ]);
    setChefModalIsOpen(false);
  };
  const toggleChefModal = () => {
    setChefModalIsOpen(!ChefModalIsOpen);
  };


/* Professeur Modal handling */

  const handleProfSelection = (profIds) => {
    setDepartementProfesseurs(profIds);
    setProfModalIsOpen(false);
  };
  const toggleProfModal = () => {
    setProfModalIsOpen(!ProfModalIsOpen);
  };

/* Filiere Modal handling */

  const handleFiliereSelection = (filiereIds) => {
    setDepartementFilieres(filiereIds);
    setFiliereModalIsOpen(false);
    
  };
  const toggleFiliereModal = () => {
    setFiliereModalIsOpen(!FiliereModalIsOpen);
  };




  const handleInsertDepartement = (button) => {    
    //verifie si les champs sont remplis
    if (
      departementNom === "" ||
      departementDescription === "" ||
      departementDateCreation === "" ||
      departementIdChef === "" 
    ) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    

    button.target.disabled = true;
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
    });
    axios.post(API_DATABASE + "/get/filiere/all").then((response) => {
      setFilieres(response.data);
    })

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
        <ChefModal IsOpen={ChefModalIsOpen} toggleModal={toggleChefModal} professeurs={professeurs} handleChefSelection={handleChefSelection}></ChefModal>
        <br />
        <label htmlFor="departement-professeurs" className="form-label">
          Departement Professeurs:
        </label>
        <button onClick={toggleProfModal} id="departement-professeurs" className="Modal-button"> Select Professeur </button>
        <ProfModal IsOpen={ProfModalIsOpen} toggleModal={toggleProfModal} professeurs={professeurs} handelProfselection={handleProfSelection} AlreadySelectedProf={departementProfesseurs}></ProfModal>
        <br />
        <label htmlFor="departement-filieres" className="form-label" >
          Departement Filieres:
        </label>
        <button onClick={toggleFiliereModal} id="departement-filieres" className="Modal-button"> Select Filiere </button>
        <FiliereModal IsOpen={FiliereModalIsOpen} toggleModal={toggleFiliereModal} filieres={filieres} handleFiliereSelection={handleFiliereSelection} AlreadySelectedFilieres={departementFilieres}></FiliereModal>
        <br />
        <button

          type="button"
          onClick={(button) => handleInsertDepartement(button)}
          className="form-button"

        >
          Insert Departement
        </button>       
      </div>
    </div>
  );
};

export default DepartementForm;
