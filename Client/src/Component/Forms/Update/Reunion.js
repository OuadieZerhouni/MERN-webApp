import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfModalPresent from "../Portal/ProfModal";
import ProfModalAbsent from "../Portal/ProfModal";
import DepartModal from "../Portal/DepartModal";

const ReunionForm = () => {
  const [reunionDate, setReunionDate] = useState("");
  const [reunionLieu, setReunionLieu] = useState("");
  const [reunionIdDepartement, setReunionIdDepartement] = useState("");
  const [reunionLoj, setReunionLoj] = useState([]);
  const [reunionProfPresent, setReunionProfPresent] = useState([]);
  const [reunionProfAbsent, setReunionProfAbsent] = useState([]);
  const [Professeurs, setProfesseurs] = useState([]);
  const [SelectedDepart, setSelectedDepart] = useState("Not Selected");

  const [ProfModalPresentIsOpen, setProfModalPresentIsOpen] = useState(false);
  const [ProfModalAbsentIsOpen, setProfModalAbsentIsOpen] = useState(false);
  const [Departements, setDepartements] = useState([]);
  const [DepartModatIsOpen, setDepartModalIsOpen] = useState(false);

  let API_DATABASE = process.env.REACT_APP_API_DATABASE;

  const handleInsertReunion = () => {
    axios
      .post(
        API_DATABASE + "/reunion/update",
        {
          _id: window.location.pathname.split("/")[3],
          Date: reunionDate,
          Lieu: reunionLieu,
          id_departement: reunionIdDepartement,
          LOJ: reunionLoj,
          prof_present: reunionProfPresent,
          prof_absent: reunionProfAbsent,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        }
      )
      .then((response) => {
        alert("Reunion Updated");
        window.location.href = "/Dashboard";
      }).catch((error) => {
        console.error(error);
      });
  };

  /*handle ProfModal*/
  const toggleModalPresent = () => {
    if (SelectedDepart === "Not Selected") {
      alert("Please Select Departement First");
      return;
    } else {
      axios
        .post(
          API_DATABASE + "/professeur/get/departement",
          {
            _id: reunionIdDepartement,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
          }
        )
        .then((response) => {
          if (response.data.length === 0) {
            alert("No Professeur in this Departement");
            return;
          }
          setProfesseurs(response.data);
          setProfModalPresentIsOpen(!ProfModalPresentIsOpen);
        });
    }
  };
  const toggleModalAbsent = () => {
    if (SelectedDepart === "Not Selected") {
      alert("Please Select Departement First");
      return;
    } else {
      axios
        .post(
          API_DATABASE + "/professeur/get/departement",
          {
            id_Departement: reunionIdDepartement,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            },
          }
        )
        .then((response) => {
          if (response.data.length === 0) {
            alert("No Professeur in this Departement");
            return;
          }
          setProfesseurs(response.data);
          setProfModalAbsentIsOpen(!ProfModalAbsentIsOpen);
        });
    }
  };

  const handlePresentSelection = (Presents) => {
    setReunionProfPresent(Presents);
    setProfModalPresentIsOpen(false);
    console.log(ProfModalPresentIsOpen);
  };

  const handleAbsentSelection = (Absents) => {
    setReunionProfAbsent(Absents);
    setProfModalAbsentIsOpen(false);
  };

  /*hanle departModal*/
  const handleDepartModal = () => {
    setDepartModalIsOpen(!DepartModatIsOpen);
  };

  const handleDepartementSelection = (Depart) => {
    setSelectedDepart(Depart.Nom);
    setReunionIdDepartement(Depart._id);
    setReunionProfPresent([]);
    setReunionProfAbsent([]);
    setDepartModalIsOpen(false);
  };

  useEffect(() => {
    axios
      .post(
        API_DATABASE + "/reunion/get/id",
        { _id: window.location.pathname.split("/")[3] },
        {
          headers: { Authorization:`Bearer ${localStorage.getItem("token")}` }
        }
      )
      .then((response) => {
        const data = response.data;
        setReunionDate(data.Date);
        setReunionLieu(data.Lieu);
        setReunionIdDepartement(data.id_departement);
        setReunionLoj(data.LOJ);
        setReunionProfPresent(data.prof_present);
        setReunionProfAbsent(data.prof_absent);
        axios
          .get(API_DATABASE + "/departements",  
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
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
      <h1 className="form-title">Insérer Reunion</h1>
      <label htmlFor="reunion-date" className="form-label">
        Date de Reunion :
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
        Lieu de Reunion :
      </label>
      <input
        className="form-input"
        type="text"
        id="reunion-Lieu"
        value={reunionLieu}
        onChange={(e) => setReunionLieu(e.target.value)}
      />
      <br />
      <label htmlFor="reunion-id-departement" className="form-label">
        Selectionez le Departement:
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
      <label htmlFor="reunion-loj" className="form-label">
        Reunion LOJ:
      </label>
      <input
        className="form-input"
        type="text"
        id="reunion-loj"
        value={reunionLoj}
        onChange={(e) => setReunionLoj(e.target.value)}
      />
      <br />
      <label htmlFor="reunion-prof-present" className="form-label">
        les Professeurs Presents:
      </label>
      <button
        onClick={toggleModalPresent}
        className="Modal-button"
        id="reunion-prof-present"
      >
        Selectionner
      </button>
      <ProfModalPresent
        IsOpen={ProfModalPresentIsOpen}
        toggleModal={toggleModalPresent}
        professeurs={Professeurs}
        handelProfselection={handlePresentSelection}
        AlreadySelectedProf={reunionProfPresent}
      ></ProfModalPresent>
      <br />
      <label htmlFor="reunion-prof-absent" className="form-label">
        Reunion Prof Absent:
      </label>
      <button
        onClick={toggleModalAbsent}
        className="Modal-button"
        id="reunion-prof-absent"
      >
        Selectionner
      </button>
      <ProfModalAbsent
        IsOpen={ProfModalAbsentIsOpen}
        toggleModal={toggleModalAbsent}
        professeurs={Professeurs}
        handelProfselection={handleAbsentSelection}
        AlreadySelectedProf={reunionProfAbsent}
      ></ProfModalAbsent>
      <br />
      <button
        className="form-button"
        type="button"
        onClick={handleInsertReunion}
      >
        Insert Reunion
      </button>
    </div>
  );
};

export default ReunionForm;
