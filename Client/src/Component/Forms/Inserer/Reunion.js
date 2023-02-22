import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfModalPresent from "../Modals/ProfModal";
import DepartModal from "../Modals/DepartModal";

const ReunionForm = () => {
  const [reunionDate, setReunionDate] = useState("");
  const [reunionLieu, setReunionLieu] = useState("");
  const [reunionIdDepartement, setReunionIdDepartement] = useState("");
  const [reunionLoj, setReunionLoj] = useState([]);
  const [reunionProfPresent, setReunionProfPresent] = useState([]);
  const [PV_file, setPV_file] = useState(null);


  const [Professeurs, setProfesseurs] = useState([]);
  const [SelectedDepart, setSelectedDepart] = useState("Not Selected");

  const [ProfModalPresentIsOpen, setProfModalPresentIsOpen] = useState(false);
  const [Departements, setDepartements] = useState([]);
  const [DepartModatIsOpen, setDepartModalIsOpen] = useState(false);

  let API_DATABASE = process.env.REACT_APP_API_DATABASE;
  const handleInsertReunion = () => {
    if (
      reunionDate === "" ||
      reunionLieu === "" ||
      reunionIdDepartement === "" ||
      reunionLoj === [] ||
      reunionProfPresent === []
    ) {
      alert("Please Fill All Fields");
      return;
    }

    const formData = new FormData();
    formData.append("file", PV_file);
    formData.append("Date", reunionDate);
    formData.append("lieu", reunionLieu);
    formData.append("id_departement", reunionIdDepartement);
    formData.append("LOJ", reunionLoj);
    formData.append("prof_present", reunionProfPresent);
    axios
      .post(
        API_DATABASE + "/reunion/insert",
        formData,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        alert("Reunion Inserted");
        window.location.href = "/Dashboard";


      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFileChange = (event) => {
    setPV_file(event.target.files[0]);
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
              Authorization: "Bearer " + localStorage.getItem("token"),
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

  const handlePresentSelection = (Presents) => {
    setReunionProfPresent(Presents);
    setProfModalPresentIsOpen(false);
    console.log(ProfModalPresentIsOpen);
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
      .post(
        API_DATABASE + "/departement/get/all",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        setDepartements(response.data);
      })
      .catch((error) => {
        console.error(error);
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
      <label htmlFor="Option-file" className="form-label">
        Emploi du temps:
        </label>
      <input
        className="form-input"
        type="file"
        id="Option-file"
        onChange={handleFileChange}
      />
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
