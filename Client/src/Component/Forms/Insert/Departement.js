import React, { useState, useEffect } from "react";
import axios from "axios";

import ChefModal from "../Portal/ChefModal";
import ProfModal from "../Portal/ProfModal";
import "../FormsCSS/Form.css";

const DepartementForm = () => {
  const [departementNom, setDepartementNom] = useState("");
  const [departementDescription, setDepartementDescription] = useState("");
  const [departementDateCreation, setDepartementDateCreation] = useState("");
  const [departementIdChef, setDepartementIdChef] = useState("");
  const [departementProfesseurs, setDepartementProfesseurs] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);

  const [SelectedProfs, setSelectedProfs] = useState([]);
  const [SelectedChef, setSelectedChef] = useState("Not Selected");

  const [ChefModalIsOpen, setChefModalIsOpen] = useState(false);
  const [ProfModalIsOpen, setProfModalIsOpen] = useState(false);

  let API_DATABASE = process.env.REACT_APP_API_DATABASE;
  /* Chef Modal handling */
  const handleChefSelection = (chef) => {
    setDepartementIdChef(chef[0]);
    setSelectedChef(chef[1]);
    setChefModalIsOpen(false);
  };
  const handleChefModal = () => {
    setChefModalIsOpen(!ChefModalIsOpen);
  };

  /* Professeur Modal handling */

  const handleProfSelection = (profIds) => {
    setDepartementProfesseurs(profIds);
    setSelectedProfs([]);
    professeurs.forEach((prof) => {
      if (profIds.includes(prof._id)) {
        setSelectedProfs((prev) => [...prev, prof]);
      }
    });

    setProfModalIsOpen(false);
  };
  const toggleProfModal = () => {
    setProfModalIsOpen(!ProfModalIsOpen);
  };

  const handleInsertDepartement = (button) => {
    if (
      departementNom === "" ||
      departementDescription === "" ||
      departementDateCreation === ""
    ) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    
    axios
    .post(
      API_DATABASE + "/departements",
      {
        Nom: departementNom,
        description: departementDescription,
        Date_Creation: departementDateCreation,
        id_Chef: departementIdChef,
        professeurs: departementProfesseurs,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    )
    .then((response) => {
      alert("Departement inserted successfully");
    })
    .catch((error) => {
      console.error(error);
    });
  };
  

  useEffect(() => {
    axios
      .get(API_DATABASE + "/professeurs",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setProfesseurs([]);
        response.data.forEach((prof) => {
          if (!(prof.id_departement === undefined) && !(prof.id_departement === "")) {
            setProfesseurs((prev) => [...prev, prof]);
          }
        });
      });
  }, [API_DATABASE]);

  return (
    <div>
      <div className="form">
        <h1 className="form-title">Insérer Departement</h1>
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
        <label htmlFor="departement-professeurs" className="form-label">
          Departement Professeurs:
        </label>
        <button
          onClick={toggleProfModal}
          id="departement-professeurs"
          className="Modal-button"
        >
          {" "}
          Select Professeur{" "}
        </button>
        <ProfModal
          IsOpen={ProfModalIsOpen}
          toggleModal={toggleProfModal}
          professeurs={professeurs}
          handelProfselection={handleProfSelection}
          AlreadySelectedProf={departementProfesseurs}
        ></ProfModal>
        <br />
        <label htmlFor="departement-Chef" className="form-label">
          Chef de Departement :
        </label>
        <button
          onClick={handleChefModal}
          id="departement-Chef"
          className="Modal-button"
        >
          {" "}
          {SelectedChef}{" "}
        </button>
        <ChefModal
          IsOpen={ChefModalIsOpen}
          toggleModal={handleChefModal}
          professeurs={SelectedProfs}
          handleChefSelection={handleChefSelection}
        ></ChefModal>

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
