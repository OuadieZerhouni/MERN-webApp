import { useState, useEffect } from "react";
import axios from "axios";
import ChefModal from "../Portal/ChefModal";
import ProfModal from "../Portal/ProfModal";
import "../../../CSS/FormsCSS/Form.css";

const DepartementForm = () => {
  const [departementNom, setDepartementNom] = useState("");
  const [departementDescription, setDepartementDescription] = useState("");
  const [departementDateCreation, setDepartementDateCreation] = useState("");
  const [departementIdChef, setDepartementIdChef] = useState("");
  const [departementProfesseurs, setDepartementProfesseurs] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);
  const [SelectedProfs, setSelectedProfs] = useState([]);
  const [SelectedChef, setSelectedChef] = useState("Not Selected");
  const [ChefModalIsOpen, setChefModalIsOpen] = useState(false);
  const [ProfModalIsOpen, setProfModalIsOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 25 }, (_, i) => currentYear - i);

  const API_DATABASE = process.env.REACT_APP_API_DATABASE;

  useEffect(() => {
    const fetchProfesseurs = async () => {
      try {
        const response = await axios.get(`${API_DATABASE}/professeurs`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const professeurs = response.data.filter((prof) => prof.id_departement !== undefined && prof.id_departement !== "");
        setProfesseurs(professeurs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfesseurs();
  }, [API_DATABASE]);

  const handleChefSelection = (chef) => {
    setDepartementIdChef(chef[0]);
    setSelectedChef(chef[1]);
    setChefModalIsOpen(false);
  };

  const handleChefModal = () => {
    setChefModalIsOpen((prev) => !prev);
  };

  const handleProfSelection = (profIds) => {
    const selectedProfs = professeurs.filter((prof) => profIds.includes(prof._id));
    setDepartementProfesseurs(profIds);
    setSelectedProfs(selectedProfs);
    setProfModalIsOpen(false);
  };

  const toggleProfModal = () => {
    setProfModalIsOpen((prev) => !prev);
  };

  const handleInsertDepartement = () => {
    if (!departementNom || !departementDescription || !departementDateCreation) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    axios
      .post(
        `${API_DATABASE}/departements`,
        {
          Nom: departementNom,
          description: departementDescription,
          Date_Creation: departementDateCreation,
          id_Chef: departementIdChef,
          professeurs: departementProfesseurs,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(() => {
        alert("Departement Ajouté");
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className="form">
        <h1 className="form-title">Insérer Departement</h1>
        <label htmlFor="departement-nom" className="form-label">
          Departement Nom:
        </label>
        <input
          className="form-input"
          type="text"
          id="departement-nom"
          value={departementNom}
          onChange={(e) => setDepartementNom(e.target.value)}
        />
        <br />
        <label htmlFor="departement-description" className="form-label">
          Departement Description:
        </label>
        <textarea
          className="form-input"
          type="text"
          id="departement-description"
          value={departementDescription}
          onChange={(e) => setDepartementDescription(e.target.value)}
        />
        <br />
        <label htmlFor="departement-date-creation" className="form-label">
          Departement Date Creation:
        </label>
        <select
          className="form-input"
          id="departement-date-creation"
          value={departementDateCreation}
          onChange={(e) => setDepartementDateCreation(e.target.value)}
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="departement-professeurs" className="form-label">
          Departement Professeurs:
        </label>
        <button onClick={toggleProfModal} id="departement-professeurs" className="Modal-button">
          {SelectedProfs.length === 0 ? "Select Professeurs" : "Selected"}
        </button>
        <br />
        <label htmlFor="departement-chef" className="form-label">
          Departement Chef:
        </label>
        <button onClick={handleChefModal} id="departement-chef" className="Modal-button">
          {SelectedChef === "Not Selected" ? "Select Chef" : SelectedChef}
        </button>
        <br />
        <button className="form-button" onClick={handleInsertDepartement}>
          Insérer
        </button>
      </div>
      <ChefModal
        IsOpen={ChefModalIsOpen}
        professeurs={SelectedProfs}
        toggleModal={handleChefModal}
        handleChefSelection={handleChefSelection}
      />
      <ProfModal
        IsOpen={ProfModalIsOpen}
        toggleModal={toggleProfModal}
        professeurs={professeurs}
        handelProfselection={handleProfSelection}
        AlreadySelectedProf={departementProfesseurs}
      />
    </div>
  );
};

export default DepartementForm;