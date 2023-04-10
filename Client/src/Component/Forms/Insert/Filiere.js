import React, { useEffect, useState } from "react";
import axios from "axios";
import DepartModal from "../Portal/DepartModal";
import CoordinateurModal from "../Portal/ChefModal";

const FiliereForm = () => {
  const [filiere, setFiliere] = useState({
    Nom: "",
    Description: "",
    Date_Creation: "",
    Effectif: "",
    id_departement: "",
    id_coordinateur: "",
  });
  const [SelectedDepart, setSelectedDepart] = useState("Not Selected");
  const [SelectedCoordinateur, setSelectedCoordinateur] = useState("Not Selected");
  const [Departements, setDepartements] = useState([]);
  const [Professeurs, setProfesseurs] = useState([]);
  const [DepartModalIsOpen, setDepartModalIsOpen] = useState(false);
  const [CoordinateurModalIsOpen, setCoordinateurModalIsOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i);

  const API_DATABASE = process.env.REACT_APP_API_DATABASE;

  const handleInsertFiliere = () => {
    if (SelectedDepart === "Not Selected") {
      alert("Please Select a Departement ");
      return;
    }
    if (SelectedCoordinateur === "Not Selected") {
      alert("Please Select a 'Coordinateur' ");
      return;
    }
    if (
      filiere.Nom === "" ||
      filiere.Description === "" ||
      filiere.Date_Creation === "" ||
      filiere.Effectif === ""
    ) {
      alert("Please Fill All Fields");
      return;
    }
    axios
      .post(
        API_DATABASE + "/filieres",
        filiere,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then((response) => {
        alert("Filiere Ajouté");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDepartModal = () => {
    setDepartModalIsOpen(!DepartModalIsOpen);
  };

  const handleDepartementSelection = (depart) => {
    setSelectedDepart(depart.Nom);
    setFiliere({ ...filiere, id_departement: depart._id, id_coordinateur: "" });
    setSelectedCoordinateur("Not Selected");
    setCoordinateurModalIsOpen(false);
    setDepartModalIsOpen(false);
  };

  const handleCoordinateurModal = () => {
    if (SelectedDepart === "Not Selected") {
      alert("Please Select Departement First");
      return;
    } else {
      axios
        .get(API_DATABASE + "/professeurs/departement/" + filiere.id_departement, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          if (response.data.length === 0) {
            alert("No Professeur in this Departement");
            return;
          }
          setProfesseurs(response.data);
          setCoordinateurModalIsOpen(!CoordinateurModalIsOpen);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCoordinateurSelection = (coordinateur) => {
    setSelectedCoordinateur(coordinateur[1]);
    setFiliere({ ...filiere, id_coordinateur: coordinateur[0] });
    setCoordinateurModalIsOpen(false);
  };

  useEffect(() => {
    axios
      .get(API_DATABASE + "/departements", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setDepartements(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [API_DATABASE]);

  return (
    <div className="form">
      <h1 className="form-title">Insérer Filiere</h1>
      <label htmlFor="filiere-nom" className="form-label">
        Filiere Nom:
      </label>
      <input
        className="form-input"
        type="text"
        id="filiere-nom"
        value={filiere.Nom}
        onChange={(e) => setFiliere({ ...filiere, Nom: e.target.value })}
      />
      <br />
      <label htmlFor="filiere-Desc" className="form-label">
        Filiere Description:
      </label>
      <input
        className="form-input"
        type="text"
        id="filiere-Desc"
        value={filiere.Description}
        onChange={(e) => setFiliere({ ...filiere, Description: e.target.value })}
      />
      <br />
      <label htmlFor="filiere-date-creation" className="form-label">
        Filiere Date Creation:
      </label>
      <select
        className="form-input"
        id="filiere-date-creation"
        value={filiere.Date_Creation}
        onChange={(e) => setFiliere({ ...filiere, Date_Creation: e.target.value })}
      >
        <option value="" disabled>
          Select Year
        </option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <br />
      <label htmlFor="filiere-effectif" className="form-label">
        Filiere Effectif:
      </label>
      <input  
        className="form-input"
        type="number"
        id="filiere-effectif"
        value={filiere.Effectif}
        onChange={(e) => setFiliere({ ...filiere, Effectif: e.target.value })}
      />
      <br />
      
      <label htmlFor="filiere-id-departement" className="form-label">
        Filiere Id Departement:
      </label>
      <button onClick={handleDepartModal} className="Modal-button">
        {SelectedDepart}
      </button>
      <DepartModal
        IsOpen={DepartModalIsOpen}
        toggleModal={handleDepartModal}
        Departements={Departements}
        handleDepartementSelection={handleDepartementSelection}
      ></DepartModal>
      <br />
      <label htmlFor="filiere-coordinateur" className="form-label">
        Filiere Coordinateur:
      </label>
      <button onClick={handleCoordinateurModal} className="Modal-button">
        {SelectedCoordinateur}
      </button>
      <CoordinateurModal
        IsOpen={CoordinateurModalIsOpen}
        toggleModal={handleCoordinateurModal}
        professeurs={Professeurs}
        handleChefSelection={handleCoordinateurSelection}
      ></CoordinateurModal>
      <br />
      <button
        className="form-button"
        type="button"
        onClick={handleInsertFiliere}
      >
        insérer Filiere
      </button>
    </div>
  );
};

export default FiliereForm;
     