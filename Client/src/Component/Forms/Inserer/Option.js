import React, { useEffect, useState } from "react";
import axios from "axios";
import FilierModal from "../Modals/FileireModal";

const FiliereForm = () => {
  const [OptionNom, setOptionNom] = useState("");
  const [OptionDescription, setOptionDescription] = useState("");
  const [OptionDateCreation, setOptionDateCreation] = useState("");

  const [OptionFiliere, setOptionFiliere] = useState("");
  const [OptionFiliereNom , setOptionFiliereNom] = useState("NotSelected");
  const [OptionEffectif, setOptionEffectif] = useState("");

  const[filieres , setfilieres] = useState([]);
  const[FiliereModalIsopen , setFiliereModalIsopen] = useState(false);




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
    axios
      .post(
        API_DATABASE + "/Option/insert",
        {
          _id: OptionFiliere,
          option: {
            Nom: OptionNom,
            Description: OptionDescription,
            Date_Creation: OptionDateCreation,
            Effectif: OptionEffectif,
          },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        console.log(response);
        window.location.href = "/Dashboard";
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //handle Modal Filiere
    const ToggleModalFiliere = () => {  
        setFiliereModalIsopen(!FiliereModalIsopen);
    }
    const handleFiliereSelection=(Filiere)=>{
        setOptionFiliere(Filiere._id);
        setOptionFiliereNom(Filiere.Nom);
        setFiliereModalIsopen(false);}

  useEffect(() => {
    axios
      .post(
        API_DATABASE + "/filiere/get/all",
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setfilieres(response.data);
        response.data.map((filiere) => {
          if (filiere._id === window.location.pathname.split("/")[3]) {
            setOptionFiliere(filiere._id);
            setOptionFiliereNom(filiere.Nom);
          }
        });
      })
     
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
        <label htmlFor="Option-filiere" className="form-label">   Option Filiere:
        </label>
        <button className="form-button" onClick={ToggleModalFiliere}>{OptionFiliereNom}</button>
        <FilierModal filieres={filieres} IsOpen={FiliereModalIsopen} toggleModal={ToggleModalFiliere} handleFiliereSelection={handleFiliereSelection}/>
     <br/>
      <button
        className="form-button"
        type="button"
        onClick={handleInsertOption}
      >
        Insert Option
      </button>
    </div>
  );
};
export default FiliereForm;
