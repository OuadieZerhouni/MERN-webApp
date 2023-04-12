import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import ProfModalPresent from "../Portal/ProfModal";
import DepartModal from "../Portal/DepartModal";
import LOJModal from "../Portal/LOJModal";

const ReunionForm = () => {
  const [reunionDate, setReunionDate] = useState("");
  const [reunionLieu, setReunionLieu] = useState("");
  const [reunionIdDepartement, setReunionIdDepartement] = useState("");
  const [reunionLoj, setReunionLoj] = useState([]);
  const [reunionProfPresent, setReunionProfPresent] = useState([]);
  const [Professeurs, setProfesseurs] = useState([]);
  const [SelectedDepart, setSelectedDepart] = useState("Not Selected");
  const [PV_file, setPV_file] = useState(null);

  const [ProfModalPresentIsOpen, setProfModalPresentIsOpen] = useState(false);
  const [Departements, setDepartements] = useState([]);

  const [LOJModalIsOpen, setLOJModalIsOpen] = useState(false);
  const [DepartModatIsOpen, setDepartModalIsOpen] = useState(false);

  let API_DATABASE = process.env.REACT_APP_API_DATABASE;
  
  const Navigate=useNavigate();

  const handleUpdateReunion = () => {
    if (
      reunionDate === "" ||
      reunionLieu === "" ||
      reunionIdDepartement === "" ||
      reunionLoj === [] ||
      reunionProfPresent === []
    ) {
      alert("s'il vous plaît remplir tous les champs");
      return;
    }

    const formData = new FormData();
    formData.append("file", PV_file);
    formData.append("Date", reunionDate);
    formData.append("Lieu", reunionLieu);
    formData.append("id_departement", reunionIdDepartement);
    formData.append("LOJ", JSON.stringify(reunionLoj));
    formData.append("prof_present", JSON.stringify(reunionProfPresent));
    axios
      .put(
        API_DATABASE + "/reunions/" + window.location.pathname.split("/")[3],
        formData,
        {headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },})
      .then((response) => {
        alert("Réunion modifié");
        Navigate("/Dashboard")
      })
      .catch((error) => {

        console.error(error);
      });
  };

  const handleFileChange = (event) => {
    setPV_file(event.target.files[0]);
  };

  /* handle LOJ Modal*/
  const toggleModalLOJ = () => {
    setLOJModalIsOpen(!LOJModalIsOpen);
  };
  const handleLOJ = (LOJ) => {
    setReunionLoj([]);
    setReunionLoj(LOJ);
    setLOJModalIsOpen(false);
  };
  /*handle ProfModal*/
  const toggleModalPresent = () => {
    if (SelectedDepart === "Not Selected") {
      alert("s'il vous plaît sélectionner un département");
      return;
    } else {
      axios
        .get(
          API_DATABASE + "/professeurs/departement/" + reunionIdDepartement,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          if (response.data.length === 0) {
            alert("Pas de Professeur Dans Ce Département");
            return;
          }
          setProfesseurs(response.data);
          setProfModalPresentIsOpen(!ProfModalPresentIsOpen);
        });
    }
  };

  const handlePresentSelection = (Presents) => {
    setReunionProfPresent(Presents);
    setProfModalPresentIsOpen(false);
   
  };

  /*hanle departModal*/
  const handleDepartModal = () => {
    setDepartModalIsOpen(!DepartModatIsOpen);
  };

  const handleDepartementSelection = (Depart) => {
    setSelectedDepart(Depart.Nom);
    setReunionIdDepartement(Depart._id);
    setReunionProfPresent([]);
    setDepartModalIsOpen(false);
  };

  useEffect(() => {
    axios
      .get(
        API_DATABASE + "/reunions/" + window.location.pathname.split("/")[3],
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        const data = response.data;
        setReunionDate(data.Date);
        setReunionLieu(data.Lieu);
        setReunionIdDepartement(data.id_departement);
        setReunionLoj(data.LOJ);
        setReunionProfPresent(data.prof_present);
        
        axios
          .get(API_DATABASE + "/departements", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
          .then((response2) => {
            setDepartements(response2.data);
            response2.data.forEach((depart) => {
              if (depart._id === data.id_departement) {
                setSelectedDepart(depart.Nom);
              }
            });
          });
      });
  }, [API_DATABASE]);

  return (
    <div className="form">
      <h1 className="form-title">Modifier Réunion</h1>
      <label htmlFor="reunion-date" className="form-label">
        Date de Réunion :
      </label>
      <input
        className="form-input"
        type="Date"
        id="reunion-date"
        value={reunionDate}
        onChange={(e) => setReunionDate(e.target.value)}
      />
      <br />
      <label htmlFor="reunion-Lieu" className="form-label">
        Lieu de Réunion :
      </label>
      <input
        className="form-input"
        type="text"
        id="reunion-Lieu"
        value={reunionLieu}
        onChange={(e) => setReunionLieu(e.target.value)}
      />
      <br />
      <button
        onClick={toggleModalLOJ}
        className="Modal-button"
        id="reunion-loj"
      >
        Entrer Liste Ordre de jour
      </button>
      <LOJModal
        IsOpen={LOJModalIsOpen}
        toggleModal={toggleModalLOJ}
        handleLOJ={handleLOJ}
        PrevLOJ={reunionLoj}
      ></LOJModal>

      <br />
      <label htmlFor="reunion-id-departement" className="form-label">
        Sélectioner le Département:
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
      <label htmlFor="reunion-prof-present" className="form-label">
        Les Professeurs Presents:
      </label>
      <button
        onClick={toggleModalPresent}
        className="Modal-button"
        id="reunion-prof-present"
      >
        Sélectionner
      </button>
      <ProfModalPresent
        IsOpen={ProfModalPresentIsOpen}
        toggleModal={toggleModalPresent}
        professeurs={Professeurs}
        handelProfselection={handlePresentSelection}
        AlreadySelectedProf={reunionProfPresent}
      ></ProfModalPresent>
      <br />
      <label htmlFor="Option-file" className="form-label">
        Modifier PV:
      </label>
      <input
        className="form-input"
        type="file"
        id="Option-file"
        accept=".pdf"
        onChange={handleFileChange}
      />
      <br />
      <button
        className="form-button"
        type="button"
        onClick={handleUpdateReunion}
      >
        Modifier
      </button>
    </div>
  );
};

export default ReunionForm;
