import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../CSS/ComponentCSS/DataTable.css";
import InfoData from "./Portal/InfoData";

import DepartTable from "./Tables/departement";
import FiliereTable from "./Tables/filiere";
import ReunionTable from "./Tables/reunion";
import ProfTable from "./Tables/professeur";
import PostTable from "./Tables/post";

const DataTable = ({ Prof }) => {
  const [activeTab, setActiveTab] = useState("departements");
  const [departements, setDepartements] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);
  const [reunion, setReunion] = useState([]);

  const [chefs, setChefs] = useState({});
  const [coords, setCoords] = useState({});
  const [FiliereDepartement, setFiliereDepartement] = useState({});
  const [ReunionDepartement, setReunionDepartement] = useState({});
  const [ReunionProfs, setReunionProfs] = useState({});

  const [PortalOpen, setPortalOpen] = useState(false);
  const [Showedtitle, setShowedtitle] = useState([]);
  const [ShowedDesc, setShowedDesc] = useState([]);

  const API_DATABASE = process.env.REACT_APP_API_DATABASE;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  //handles the portal
  const togglePortal = () => {
    setPortalOpen(!PortalOpen);
  };
  const ShowInfo = (title, desc) => {
    setShowedtitle(title);
    setShowedDesc(desc);
    togglePortal();
  };

  useEffect(() => {
    document.title = "Dashboard";

    const getChefDepartement = async (id) => {
      return axios
        .get(API_DATABASE + "/professeurs/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          return response.data.FullName;
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    };
    const getCoordFiliere = async (id) => {
      return axios
        .get(API_DATABASE + "/professeurs/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          return response.data.FullName;
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    };
    const getProfName = async (id) => {
      return axios
        .get(API_DATABASE + "/professeurs/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          return response.data.FullName;
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    };

    const getDepartFiliere = async (id) => {
      return axios
        .get(API_DATABASE + "/departements/" + id, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })

        .then((response) => {
          return response.data.Nom;
        })
        .catch((error) => {
          console.error(error);
          throw error;
        });
    };

    //departements
    axios
      .get(API_DATABASE + "/departements", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        setDepartements(response.data);
        response.data.forEach(async (department) => {
          const chefName = await getChefDepartement(department.id_Chef)
            .then((fullName) => {
              return fullName;
            })
            .catch((error) => {
              console.error(error);
            });
          setChefs((prevState) => ({
            ...prevState,
            [department._id]: chefName,
          }));
        });
      })
      .catch((error) => {
        console.error(error);
      });
    //filieres
    axios
      .get(API_DATABASE + "/filieres", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        setFilieres(response.data);
        response.data.forEach(async (filiere) => {
          const coordName = await getCoordFiliere(filiere.id_coordinateur)
            .then((fullName) => {
              return fullName;
            })
            .catch((error) => {
              console.error(error);
            });
          setCoords((prevState) => ({
            ...prevState,
            [filiere._id]: coordName,
          }));
          const departementName = await getDepartFiliere(
            filiere.id_departement
          );

          setFiliereDepartement((prevState) => ({
            ...prevState,
            [filiere._id]: departementName,
          }));
        });
      })
      .catch((error) => {
        console.error(error);
      });
    //professeurs
    axios
      .get(API_DATABASE + "/professeurs", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        setProfesseurs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    //----reunion
    axios
      .get(API_DATABASE + "/reunions", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((response) => {
        setReunion(response.data);
        response.data.map(async (reunion) => {
          getDepartFiliere(reunion.id_departement).then((departementName) => {
            setReunionDepartement((prevState) => ({
              ...prevState,
              [reunion._id]: departementName,
            }));
          });
        });
        response.data.map(async (reunion) => {
          //get profs names from id array and put them in array in front of the reunion id
          const profsNames = [];
          reunion.prof_present.forEach(async (profId) => {
            getProfName(profId).then((profName) => {
              profsNames.push(profName);
            });
            setReunionProfs((prevState) => ({
              ...prevState,
              [reunion._id]: profsNames,
            }));
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [API_DATABASE]);

  return (
    <div className="DataTable">
      <InfoData
        IsOpen={PortalOpen}
        toggleModal={togglePortal}
        title={Showedtitle}
        description={ShowedDesc}
      />

      <div className="tabs">
        <div
          className={`tab ${activeTab === "departements" ? "active" : ""}`}
          onClick={() => handleTabClick("departements")}
        >
          Départements
        </div>
        <div
          className={`tab ${activeTab === "filiere" ? "active" : ""}`}
          onClick={() => handleTabClick("filiere")}
        >
          Filières
        </div>
        <div
          className={`tab ${activeTab === "professeurs" ? "active" : ""}`}
          onClick={() => handleTabClick("professeurs")}
        >
          Professeurs
        </div>
        <div
          className={`tab ${activeTab === "reunions" ? "active" : ""}`}
          onClick={() => handleTabClick("reunions")}
        >
          Réunions
        </div>
      </div>
      <div className="prof-info">
        <p>Nom : {Prof.FullName}</p>
        <p>E-mail : {Prof.email}</p>
        <p>Grade : {Prof.grade}</p>
      </div>
      <div className="tab-content">
        <DepartTable
          activeTab={activeTab}
          departements={departements}
          chefs={chefs}
          ShowInfo={ShowInfo}
        />
        <FiliereTable
          activeTab={activeTab}
          filieres={filieres}
          coords={coords}
          FiliereDepartement={FiliereDepartement}
          ShowInfo={ShowInfo}
        />
        <ProfTable activeTab={activeTab} professeurs={professeurs} />
        <ReunionTable
          activeTab={activeTab}
          reunions={reunion}
          ReunionDepartement={ReunionDepartement}
          ReunionProfs={ReunionProfs}
          Prof={Prof}
        />

      </div>
    </div>
  );
};

export default DataTable;
