import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../CSS/ComponentCSS/DataTable.css";
import InfoData from "./Portal/InfoData";

import DepartTable from "./Tables/departement";
import FiliereTable from "./Tables/filiere";
import ProfTable from "./Tables/professeur";
import ReunionTable from "./Tables/reunion";

const DataTable = () => {
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


  const _departement = JSON.parse(localStorage.getItem("departement"));

  const API_DATABASE = process.env.REACT_APP_API_DATABASE;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleDeleteProfesseur = async (id) => {
    return axios
      .delete(API_DATABASE + "/professeurs/" + id,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setProfesseurs(professeurs.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDeleteFiliere = async (id) => {
    return axios
      .delete(API_DATABASE + "/filieres/" + id,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        setFilieres(filieres.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDeleteOption = async (id) => {
    return axios
      .delete(API_DATABASE + "/options/" + id,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        refreshFiliere();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteReunion = async (id) => {
    return axios
      .delete(API_DATABASE + "/reunions/" + id,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setReunion(reunion.filter((item) => item._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const refreshFiliere = async () => {
    axios
      .get(API_DATABASE + "/filieres",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setFilieres(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

   //handles the portal
   const togglePortal=()=>{
    setPortalOpen(!PortalOpen);}
  const ShowInfo=(title,desc)=>{
    setShowedtitle(title);
    setShowedDesc(desc);
    togglePortal();
  }
  useEffect(() => {
    document.title = "Dashboard";

    const getChefDepartement = async (id) => {
      return axios
        .get(API_DATABASE + "/professeurs/" + id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
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
        .get(API_DATABASE + "/professeurs/" + id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
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
        .get(API_DATABASE + "/professeurs/" + id,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
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
               .get(API_DATABASE + "/departements/" + id, { headers: { Authorization: "Bearer " + localStorage.getItem("token") } })

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
      .get(API_DATABASE + "/filieres",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
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
      .get(API_DATABASE + "/professeurs",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        setProfesseurs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    //----reunion
    axios
      .get(
        API_DATABASE + "/reunions",
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
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
                <InfoData IsOpen={PortalOpen} toggleModal={togglePortal} title={Showedtitle} description={ShowedDesc} />

      <div className="tabs">
        <div
          className={`tab ${activeTab === "departements" ? "active" : ""}`}
          onClick={() => handleTabClick("departements")}
        >
          Departements
        </div>
        <div
          className={`tab ${activeTab === "filiere" ? "active" : ""}`}
          onClick={() => handleTabClick("filiere")}
        >
          Filiere
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
          Reunions
        </div>
      </div>
      <div className="tab-content">
        <DepartTable
          activeTab={activeTab}
          departements={departements}
          chefs={chefs}
          _departement={_departement}
          ShowInfo={ShowInfo}


        />
        <FiliereTable
          activeTab={activeTab}
          filieres={filieres}
          coords={coords}
          FiliereDepartement={FiliereDepartement}
          handleDeleteFiliere={handleDeleteFiliere}
          handleDeleteOption={handleDeleteOption}
          _departement={_departement}
          ShowInfo={ShowInfo}
        />
        <ProfTable
          activeTab={activeTab}
          professeurs={professeurs}
          handleDeleteProfesseur={handleDeleteProfesseur}
          _departement={_departement}
        />
        <ReunionTable
          activeTab={activeTab}
          reunions={reunion}
          ReunionDepartement={ReunionDepartement}
          ReunionProfs={ReunionProfs}
          handleDeleteReunion={handleDeleteReunion}
          _departement={_departement}
        />

       
      </div>
    </div>
  );
};

export default DataTable;
