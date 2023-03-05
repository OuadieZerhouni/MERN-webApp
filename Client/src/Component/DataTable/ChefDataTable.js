import React, { useState, useEffect } from "react";
import axios from "axios";
import "../ComponentCSS/DataTable.css";

import DepartTable from "./ChefTables/departement";
import FiliereTable from "./ChefTables/filiere";
import ProfTable from "./ChefTables/professeur";
import ReunionTable from "./ChefTables/reunion";

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


  const _departement = JSON.parse(localStorage.getItem("departement"));

  const API_DATABASE = process.env.REACT_APP_API_DATABASE;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleDeleteProfesseur = async (id) => {
    return axios
      .post(
        API_DATABASE + "/professeur/delete",
        { _id: id },
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
      .post(
        API_DATABASE + "/filiere/delete",
        { _id: id },
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
      .post(
        API_DATABASE + "/Option/delete",
        { _id: id },
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
      .post(
        API_DATABASE + "/reunion/delete",
        { _id: id },
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
      .post(
        API_DATABASE + "/filiere/get/all",
        {},
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
  useEffect(() => {
    document.title = "Dashboard";

    const getChefDepartement = async (id) => {
      return axios
        .post(
          API_DATABASE + "/professeur/get/id",
          { _id: id },
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
        .post(
          API_DATABASE + "/professeur/get/id",
          { _id: id },
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
        .post(
          API_DATABASE + "/professeur/get/id",
          { _id: id },
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
      .post(
        API_DATABASE + "/filiere/get/all",
        {},
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
      .post(
        API_DATABASE + "/professeur/get/all",
        {},
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
      .post(
        API_DATABASE + "/reunion/get/all",
        {},
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
        />
        <FiliereTable
          activeTab={activeTab}
          filieres={filieres}
          coords={coords}
          FiliereDepartement={FiliereDepartement}
          handleDeleteFiliere={handleDeleteFiliere}
          handleDeleteOption={handleDeleteOption}
          _departement={_departement}
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
