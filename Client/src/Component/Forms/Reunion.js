import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfModalPresent from "./Modals/ProfModal";
import ProfModalAbsent from "./Modals/ProfModal";

const ReunionForm = () => {
  const [reunionDate, setReunionDate] = useState("");
  const [reunionLieu, setReunionLieu] = useState("");
  const [reunionIdDepartement, setReunionIdDepartement] = useState("");
  const [reunionLoj, setReunionLoj] = useState([]);
  const [reunionProfPresent, setReunionProfPresent] = useState([]);
  const [reunionProfAbsent, setReunionProfAbsent] = useState([]);
  const [Professeurs, setProfesseurs] = useState([]);

  const [ProfModalPresentIsOpen, setProfModalPresentIsOpen] = useState(false);
  const [ProfModalAbsentIsOpen, setProfModalAbsentIsOpen] = useState(false);

  let API_DATABASE = process.env.REACT_APP_API_DATABASE;

  const handleInsertReunion = () => {
    axios
      .post(API_DATABASE + "/insert/reunion", {
        Date: reunionDate,
        lieu: reunionLieu,
        id_departement: reunionIdDepartement,
        LOJ: [reunionLoj],
        prof_present: [reunionProfPresent],
        prof_absent: [reunionProfAbsent],
      })
      .then((response) => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.error(error);
      });
  };
  /*handle Modal*/
  const toggleModalPresent = () => {
    setProfModalPresentIsOpen(!ProfModalPresentIsOpen);
    console.log(ProfModalAbsentIsOpen);
  };
  const toggleModalAbsent = () => {
    setProfModalAbsentIsOpen(!ProfModalAbsentIsOpen);
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

  useEffect(() => {
    axios
      .post(API_DATABASE + "/get/professeur/all")
      .then((response) => {
        setProfesseurs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [API_DATABASE]);

  return (
    <div className="form">
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
      <label htmlFor="reunion-lieu" className="form-label">
        Lieu de Reunion :
      </label>
      <input
        className="form-input"
        type="text"
        id="reunion-lieu"
        value={reunionLieu}
        onChange={(e) => setReunionLieu(e.target.value)}
      />
      <br />
      <label htmlFor="reunion-id-departement" className="form-label">
        Selectionez le Departement:
      </label>
      <input
        className="form-input"
        type="text"
        id="reunion-id-departement"
        value={reunionIdDepartement}
        onChange={(e) => setReunionIdDepartement(e.target.value)}
      />
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
