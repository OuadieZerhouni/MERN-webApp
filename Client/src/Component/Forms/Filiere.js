import React, { useEffect, useState } from "react";
import axios from "axios";
import DepartModal from "./Modals/DepartModal";
import CoordinateurModal from "./Modals/ChefModal";

const FiliereForm = () => {
  const [filiereNom, setFiliereNom] = useState("");
  const [filiereDescription, setFiliereDescription] = useState("");
  const [filiereDateCreation, setFiliereDateCreation] = useState("");
  const [filiereIdDepartement, setFiliereIdDepartement] = useState("");
  const [filiereEffectif, setFiliereEffectif] = useState("");
  const [filiereCoordinateur, setFiliereCoordinateur] = useState("");

  const [SelectedDepart, setSelectedDepart] = useState("Not Selected");
  const [SelectedCoordinateur, setSelectedCoordinateur] =
    useState("Not Selected");

  const [Departements, setDepartements] = useState([]);
  const [Professeurs, setProfesseurs] = useState([]);

  const [DepartModatIsOpen, setDepartModalIsOpen] = useState(false);
  const [CoordinateurModalIsOpen, setCoordinateurModalIsOpen] = useState(false);

  let API_DATABASE = process.env.REACT_APP_API_DATABASE;

  const handleInsertFiliere = () => {
    if(SelectedDepart === "Not Selected"){
      alert("Please Select a Departement ");
      return;
    }
    if(SelectedCoordinateur === "Not Selected"){
      alert("Please Select a 'Coordinateur' ");
      return;
    }
    if(filiereNom === ""
    || filiereDescription === "" 
    || filiereDateCreation === ""
    || filiereEffectif === ""){
      alert("Please Fill All Fields");
      return;
    }
    axios
      .post(API_DATABASE + "/insert/filiere", {
        Nom: filiereNom,
        Description: filiereDescription,
        Date_Creation: filiereDateCreation,
        Effectif: filiereEffectif,
        id_coordinateur: filiereCoordinateur,
        id_departement: filiereIdDepartement,
      })
      .then((response) => {
        console.log(response);
        window.location.href="/";
      })
      .catch((error) => {
        console.error(error);
      });
  };
  /*hanle departModal*/
  const handleDepartModal = () => {
    setDepartModalIsOpen(!DepartModatIsOpen);
  };

  const handleDepartementSelection = (Depart) => {
    setSelectedDepart(Depart.Nom);
    setFiliereIdDepartement(Depart._id);
    setSelectedCoordinateur("Not Selected");
    setFiliereCoordinateur("");
    setDepartModalIsOpen(false);
  };

  /*handle coordinateurModal*/
  const handleCoordinateurModal = () => {
    if (SelectedDepart === "Not Selected") {
      alert("Please Select Departement First");
      return;
    } else {
      axios
        .post(API_DATABASE + "/get/professeur/departement", {
          id_Departement: filiereIdDepartement,
        })
        .then((response) => {
          if(response.data.length === 0){alert("No Professeur in this Departement");return;}
          setProfesseurs(response.data);
          setCoordinateurModalIsOpen(!CoordinateurModalIsOpen);
        });

    }
  };

  const handleCoordinateurSelection = (_id,FullName) => {
    setSelectedCoordinateur(FullName);
    setFiliereCoordinateur(_id);
    setCoordinateurModalIsOpen(false);
  };

  useEffect(() => {
    axios.post(API_DATABASE + "/get/departement/all").then((response) => {
      setDepartements(response.data);
    });
  }, [API_DATABASE]);

  return (
    <div className="form">
      <label htmlFor="filiere-nom" className="form-label">
        Filiere Nom:
      </label>
      <input
        className="form-input"
        type="text"
        id="filiere-nom"
        value={filiereNom}
        onChange={(e) => setFiliereNom(e.target.value)}
      />
      <br />
      <label htmlFor="filiere-Desc" className="form-label">
        Filiere Description:
      </label>
      <input
        className="form-input"
        type="text"
        id="filiere-Desc"
        value={filiereDescription}
        onChange={(e) => setFiliereDescription(e.target.value)}
      />
      <br />
      <label htmlFor="filiere-date-creation" className="form-label">
        Filiere Date Creation:
      </label>
      <input
        className="form-input"
        type="Date"
        id="filiere-date-creation"
        value={filiereDateCreation}
        onChange={(e) => setFiliereDateCreation(e.target.value)}
      />
      <br />
      <label htmlFor="filiere-effectif" className="form-label">
        Filiere Effectif:
      </label>
      <input
        className="form-input"
        type="number"
        id="filiere-effectif"
        value={filiereEffectif}
        onChange={(e) => setFiliereEffectif(e.target.value)}
      />
      <br />
      <label htmlFor="filiere-id-departement" className="form-label">
        Filiere Id Departement:
      </label>
      <button onClick={handleDepartModal} className="Modal-button">
        {SelectedDepart}
      </button>
      <DepartModal
        IsOpen={DepartModatIsOpen}
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
        Insert Filiere
      </button>
    </div>
  );
};

export default FiliereForm;
