import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import ChefModal from "../Portal/ChefModal";
import ProfModal from "../Portal/ProfModal";
// import FiliereModal from "./Portal/FileireModal";
import "../../../CSS/FormsCSS/Form.css";

const DepartementForm = () => {
  const [departementNom, setDepartementNom] = useState("");
  const [departementDescription, setDepartementDescription] = useState("");
  const [departementDateCreation, setDepartementDateCreation] = useState("");
  const [departementIdChef, setDepartementChef] = useState("");
  const [departementProfesseurs, setDepartementProfesseurs] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);

  const [SelectedProfs, setSelectedProfs] = useState([]);
  const [SelectedChef, setSelectedChef] = useState("Not Selected");

  const [ChefModalIsOpen, setChefModalIsOpen] = useState(false);
  const [ProfModalIsOpen, setProfModalIsOpen] = useState(false);
  
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i);


  let API_DATABASE = process.env.REACT_APP_API_DATABASE;

  /* Chef Modal handling */
  const handleChefSelection = (chef) => {
    setDepartementChef(chef[0]);
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
 const Navigate= useNavigate()
  const handleModifyDepartement = () => {
    if (
      departementNom === "" ||
      departementDescription === "" ||
      departementDateCreation === ""
      
    ) {
      alert("Veuillez remplir tous les champs Correctememnt");
      return;
    }

    axios
      .put( API_DATABASE + "/departements/" + window.location.pathname.split("/")[3],
        {
          _id: window.location.pathname.split("/")[3],
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
        alert("Departement modifié");
        Navigate("/Dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departementResponse, professeurResponse] = await Promise.all([
          axios.get(API_DATABASE + "/departements/" + window.location.pathname.split("/")[3],
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
          ),
          axios.get(API_DATABASE + "/professeurs",
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
          )
        ]);
  
        const departement = departementResponse.data;
  
        // Fill Form with Departement data
        const { Nom, description, Date_Creation, id_Chef, professeurs } = departement;
        setDepartementNom(Nom);
        setDepartementDescription(description);
        setDepartementDateCreation(Date_Creation.split("T")[0]);
        setDepartementChef(id_Chef);
        setDepartementProfesseurs(professeurs);
  
        // Fill Professeurs data
        const professeursData = professeurResponse.data;
        const professeursByDepartement = [];
        const selectedProfs = [];
  
        professeursData.forEach((prof) => {
          if (prof.id_departement === departement._id || !prof.id_departement) {
            professeursByDepartement.push(prof);
          }
  
          if (prof._id === departement.id_Chef) {
            setSelectedChef(prof.FullName);
          }
  
          if (departement.professeurs.includes(prof._id)) {
            selectedProfs.push(prof);
          }
        });
        setProfesseurs(professeursByDepartement);
        setSelectedProfs(selectedProfs);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [API_DATABASE]);
  

  return (
    <div>
      <div className="form">
        <h1 className="form-title">Modifier Département</h1>
        <label htmlFor="departement-nom" className="form-label">
          Département Nom:
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
          Département Description:
        </label>
        <textarea
          className="form-input"
          type="text"
          id="departement-description"
          value={departementDescription}
          onChange={(e) => setDepartementDescription(e.target.value)}
        />
        <br />
        <label htmlFor="filiere-date-creation" className="form-label">
        Filière Date Création:
      </label>
      <select
        className="form-input"
        id="filiere-date-creation"
        value={departementDateCreation}
        onChange={(e) => setDepartementDateCreation(e.target.value)}
      >
        <option value="" disabled>
          Séléctionner une année
        </option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
        <br />
        <label htmlFor="departement-professeurs" className="form-label">
        Professeurs de Département :
        </label>
        <button
          onClick={toggleProfModal}
          id="departement-professeurs"
          className="Modal-button"
        >
          {" "}
          Sélectionner Professeur{" "}
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
          Chef de Département :
        </label>
        <button
          onClick={handleChefModal}
          id="departement-Chef"
          className="Modal-button"
        >
          {" "}
          {SelectedChef}{" "}
        </button>
        {SelectedProfs.length > 0 && (
  <ChefModal
    IsOpen={ChefModalIsOpen}
    toggleModal={handleChefModal}
    professeurs={SelectedProfs}
    handleChefSelection={handleChefSelection}
  />
)}

        <br />
        <button
          type="button"
          onClick={ handleModifyDepartement}
          className="form-button"
        >
          Modifier
        </button>
        
      </div>
    </div>
  );
};

export default DepartementForm;
