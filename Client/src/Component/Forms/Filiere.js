import React, { useEffect, useState } from "react";
import axios from "axios";
import DepartModal from "./Modals/DepartModal";

const FiliereForm = () => {
  const [filiereNom, setFiliereNom] = useState("");
  const [filiereDescription, setFiliereDescription] = useState("");
  const [filiereDateCreation, setFiliereDateCreation] = useState("");
  const [filiereIdDepartement, setFiliereIdDepartement] = useState("");
  const [SelectedDepart, setSelectedDepart] = useState("Not Selected");
  const [Departements, setDepartements] = useState([]);
  const [filiereOptions, setFiliereOptions] = useState([]);

  const [DepartModatIsOpen, setDepartModalIsOpen] = useState(false);

  let API_DATABASE = process.env.REACT_APP_API_DATABASE;

  const handleInsertFiliere = () => {
    axios
      .post(API_DATABASE + "/insert/filiere", {
        Nom: filiereNom,
        description: filiereDescription,
        Date_Creation: filiereDateCreation,
        id_Departement: filiereIdDepartement,
        options: filiereOptions,
      })
      .then((response) => {
        console.log(response);
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
    setDepartModalIsOpen(false);
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
        value={filiereNom}
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
      <label htmlFor="filiere-id-departement" className="form-label">
        Filiere Id Departement:
      </label>
      <button onClick={handleDepartModal}  className="Modal-button" type="button">{SelectedDepart}</button>
      <DepartModal IsOpen={DepartModatIsOpen} toggleModal={handleDepartModal} Departements={Departements} handleDepartementSelection={handleDepartementSelection}  ></DepartModal>
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
