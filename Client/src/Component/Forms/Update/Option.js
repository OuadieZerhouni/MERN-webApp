import React, { useEffect, useState } from "react";
import axios from "axios";
import FilierModal from "../Portal/FileireModal";

const OptionForm = () => {
  const [OptionNom, setOptionNom] = useState("");
  const [OptionDescription, setOptionDescription] = useState("");
  const [OptionDateCreation, setOptionDateCreation] = useState("");

  const [OptionFiliere, setOptionFiliere] = useState("");
  const [OptionFiliereNom, setOptionFiliereNom] = useState("Not Selected");
  const [OptionEffectif, setOptionEffectif] = useState("");
  const [file, setFile] = useState(null);

  const [filieres, setfilieres] = useState([]);
  const [FiliereModalIsopen, setFiliereModalIsopen] = useState(false);

  let API_DATABASE = process.env.REACT_APP_API_DATABASE;

  const handleModifyOption = () => {
    if (
      OptionNom === "" ||
      OptionDescription === "" ||
      OptionDateCreation === "" ||
      OptionEffectif === ""
    ) {
      alert("Please Fill All Fields");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("_id", window.location.pathname.split("/")[3]);
    formData.append("id_filiere", OptionFiliere);
    formData.append("Nom", OptionNom);
    formData.append("Description", OptionDescription);
    formData.append("Date_Creation", OptionDateCreation);
    formData.append("effectif", OptionEffectif);

    axios
      .put(API_DATABASE + "/Options/"+window.location.pathname.split("/")[3]
      , formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(formData);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  //handle Modal Filiere
  const ToggleModalFiliere = () => {
    setFiliereModalIsopen(!FiliereModalIsopen);
  };
  const handleFiliereSelection = (Filiere) => {
    setOptionFiliere(Filiere._id);
    setOptionFiliereNom(Filiere.Nom);
    setFiliereModalIsopen(false);
  };

  useEffect(() => {
    const FillForm = (OptionData) => {
      setOptionNom(OptionData.Nom);
      setOptionDescription(OptionData.Description);
      setOptionDateCreation(OptionData.Date_Creation.split("T")[0]);
      setOptionEffectif(OptionData.effectif);
    };

    axios
      .get(
        API_DATABASE + "/filieres", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setfilieres(response.data);
        response.data.forEach((filiere) => {
          filiere.Options.forEach((option) => {
            if (option._id === window.location.pathname.split("/")[3]) {
              FillForm(option);
              handleFiliereSelection(filiere);
            }
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [API_DATABASE]);

  return (
    <div className="form">
      <h1 className="form-title">Modifier Option</h1>
      <label htmlFor="Option-nom" className="form-label">
        Option Nom:
      </label>
      <input
        className="form-input"
        type="text"
        id="Option-nom"
        value={OptionNom}
        onChange={(e) => setOptionNom(e.target.value)}
      />
      <br />
      <label htmlFor="Option-Desc" className="form-label">
        Option Description:
      </label>
      <input
        className="form-input"
        type="text"
        id="Option-Desc"
        value={OptionDescription}
        onChange={(e) => setOptionDescription(e.target.value)}
      />
      <br />
      <label htmlFor="Option-date-creation" className="form-label">
        Option Date Creation:
      </label>
      <input
        className="form-input"
        type="Date"
        id="Option-date-creation"
        value={OptionDateCreation}
        onChange={(e) => setOptionDateCreation(e.target.value)}
      />
      <br />
      <label htmlFor="Option-effectif" className="form-label">
        Option Effectif:
      </label>
      <input
        className="form-input"
        type="number"
        id="Option-effectif"
        value={OptionEffectif}
        onChange={(e) => setOptionEffectif(e.target.value)}
      />

      <br />
      <label htmlFor="Option-filiere" className="form-label">
        {" "}
        Option Filiere:
      </label>
      <button className="form-button" onClick={ToggleModalFiliere}>
        {OptionFiliereNom}
      </button>
      <FilierModal
        filieres={filieres}
        IsOpen={FiliereModalIsopen}
        toggleModal={ToggleModalFiliere}
        handleFiliereSelection={handleFiliereSelection}
      />
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

      <button
        className="form-button"
        type="button"
        onClick={handleModifyOption}
      >
        Modifier Option
      </button>
    </div>
  );
};
export default OptionForm;
