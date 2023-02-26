import React, { useEffect, useState } from "react";
import axios from "axios";
import DepartModal from "../Portal/DepartModal";
import CoordinateurModal from "../Portal/ChefModal";

const FiliereForm = () => {
  const [filiereNom, setFiliereNom] = useState("");
  const [filiereDescription, setFiliereDescription] = useState("");
  const [filiereDateCreation, setFiliereDateCreation] = useState("");
  const [filiereDepartement, setFiliereDepartement] = useState("");
  const [filiereEffectif, setFiliereEffectif] = useState("");
  const [filiereCoordinateur, setFiliereCoordinateur] = useState("");

  const [SelectedDepart, setSelectedDepart] = useState("Not Selected");
  const [SelectedCoordinateur, setSelectedCoordinateur] = useState("Not Selected");

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
      alert("Veuillez remplir tous les champs Correctememnt");
      return;
    }
    axios
      .post(API_DATABASE + "/filiere/update", {
        _id: window.location.pathname.split("/")[3],
        Nom: filiereNom,
        Description: filiereDescription,
        Date_Creation: filiereDateCreation,
        Effectif: filiereEffectif,
        id_coordinateur: filiereCoordinateur,
        id_departement: filiereDepartement,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
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
    setFiliereDepartement(Depart._id);
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
        .post(API_DATABASE + "/professeur/get/departement", {
          _id: filiereDepartement,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        .then((response) => {
          if(response.data.length === 0){alert("No Professeur in this Departement");return;}
          setProfesseurs(response.data);
          setCoordinateurModalIsOpen(!CoordinateurModalIsOpen);
        });

    }
  };

  const handleCoordinateurSelection = async(_coordinateur) => {
    setSelectedCoordinateur(_coordinateur[1]);
    setFiliereCoordinateur(_coordinateur[0]);
    setCoordinateurModalIsOpen(false);
  };

  useEffect(() => {
    //departements
   
    //get filiere 
    axios.post(API_DATABASE + "/filiere/get/id", {
        _id: window.location.pathname.split("/")[3],
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        ).then((response) => {
           FillForm(response.data);
        })
          

    const FillForm =(_filiere) => {
        axios.post(API_DATABASE + "/departement/get/all",{},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}
        ).then((response) => {
        setDepartements(response.data);
        response.data.forEach((depart) => {
            if (depart._id === _filiere.id_departement) {
                setSelectedDepart(depart.Nom);
                setFiliereDepartement(depart._id);
            }
        });

        })
        setFiliereNom(_filiere.Nom);
        setFiliereDescription(_filiere.Description);
        setFiliereDateCreation(_filiere.Date_Creation.split("T")[0]);
        setFiliereEffectif(_filiere.Effectif);
        axios
        .post(API_DATABASE + "/professeur/get/departement", {
          _id: _filiere.id_departement,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        .then((response) => {
          if(response.data.length === 0){alert("No Professeur in this Departement");return;}
          setProfesseurs(response.data);
            response.data.forEach((prof) => {
                if (prof._id === _filiere.id_coordinateur) {
                    setSelectedCoordinateur(prof.FullName);
                    setFiliereCoordinateur(prof._id);
                }
            });
        });
    };


  }, [API_DATABASE]);

  return (
    <div className="form">
      <h1 className="form-title">Modifier Filiere</h1>
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
        Modifier  Filiere
      </button>
    </div>
  );
};

export default FiliereForm;
