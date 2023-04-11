import React, { useEffect, useState } from "react";
import axios from "axios";
import FilierModal from "../Portal/FileireModal";

const OptionForm = () => {
  const [OptionNom, setOptionNom] = useState("");
  const [OptionDescription, setOptionDescription] = useState("");
  const [OptionDateCreation, setOptionDateCreation] = useState("");

  const [OptionFiliere, setOptionFiliere] = useState("");
  const [OptionFiliereNom, setOptionFiliereNom] = useState("NotSelected");
  const [OptionEffectif, setOptionEffectif] = useState("");
  const [file, setFile] = useState(null);
  const [OptionPrivateLink, setOptionPrivateLink] = useState("");

  const [filieres, setfilieres] = useState([]);
  const [FiliereModalIsopen, setFiliereModalIsopen] = useState(false);

  let API_DATABASE = process.env.REACT_APP_API_DATABASE;

  const handleInsertOption = () => {
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
    formData.append("_id", OptionFiliere);
    formData.append("file", file);
    formData.append("Lien_modification", OptionPrivateLink);
    formData.append("Nom", OptionNom);
    formData.append("Description", OptionDescription);
    formData.append("Date_Creation", OptionDateCreation);
    formData.append("effectif", OptionEffectif);

    axios
      .post(API_DATABASE + "/Options", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Option Ajouté");
        window.location.reload();
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
    axios
      .get(API_DATABASE + "/filieres", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setfilieres(response.data);
        response.data.forEach((filiere) => {
          if (filiere._id === window.location.pathname.split("/")[3]) {
            setOptionFiliere(filiere._id);
            setOptionFiliereNom(filiere.Nom);
          }
        });
      });
  }, [API_DATABASE]);

  return (
    <div className="form">
      <h1 className="form-title">Insérer Option</h1>
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
      <textarea
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
        lien privé(docs sheet drive)
      </label>
      <input
        type={Text}
        className="form-input"
        id="Option-file"
        value={OptionPrivateLink}
        onChange={(e) => setOptionPrivateLink(e.target.value)}
      />
      <br />
      <label htmlFor="Option-file" className="form-label">
        Emploi du temps (pdf):
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
        onClick={handleInsertOption}
      >
        insérer Option
      </button>
    </div>
  );
};
export default OptionForm;
