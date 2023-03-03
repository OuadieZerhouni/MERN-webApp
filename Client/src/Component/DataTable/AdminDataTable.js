import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../ComponentCSS/DataTable.css";

// import DepartTable from "./Tables/DepartTable";
// import FiliereTable from "./Tables/FiliereTable";
// import ProfTable from "./Tables/ProfTable";
// import ReunionTable from "./Tables/ReunionTable";

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

  const [showOptions, setShowOptions] = useState({});

  const API_DATABASE = process.env.REACT_APP_API_DATABASE;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDeleteDepartement = (id) => {
    axios
      .post(API_DATABASE+"/departement/delete", { _id: id }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setDepartements(departements.filter((departement) => departement._id !== id));
        refreshFiliere();
        refreshReunion ();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDeleteFiliere = (id) => {
    axios
      .post(API_DATABASE+"/filiere/delete", { _id: id }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setFilieres(filieres.filter((filiere) => filiere._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDeleteProfesseur = (id) => {
    axios
      .post(API_DATABASE+"/professeur/delete", { _id: id }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setProfesseurs(professeurs.filter((professeur) => professeur._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteReunion = (id) => {
    axios
      .post(API_DATABASE+"/reunion/delete", { _id: id }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setReunion(reunion.filter((reunion) => reunion._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const refreshFiliere = async() => {
    axios
      .post(API_DATABASE+"/filiere/get/all",{}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setFilieres(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const refreshReunion = async () => {
    axios.post(API_DATABASE+"/reunion/get/all", {}, {headers: { Authorization: "Bearer " + localStorage.getItem("token"), },})
      .then((response) => {
        setReunion(response.data);
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
        .post(
          API_DATABASE + "/departement/get/id",
          { _id: id },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
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
      .post(
        API_DATABASE + "/departement/get/all",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
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
        {activeTab === "departements" && (
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>description</th>
                <th>Date de Creation</th>
                <th>Chef de departement</th>
                <th>modify</th>
              </tr>
            </thead>
            <tbody>
              {departements.map((departement) => (
                <tr key={departement._id}>
                  <td>{departement.Nom}</td>
                  <td>
                    {departement.description.length > 50
                      ? departement.description.substring(0, 50) + "..."
                      : departement.description}
                  </td>

                  <td>{departement.Date_Creation.substring(0, 10)}</td>
                  <td>
                    {chefs[departement._id] ? chefs[departement._id] : ""}
                  </td>
                  <td>
                    <button
                      className="btn-delete" 
                      onClick={()=>handleDeleteDepartement(departement._id)}
                    >
                      delete
                    </button>
                    <Link
                      className="btn-modify"
                      to={"/modify/departement/" + departement._id}
                    >
                      modify
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === "filiere" && (
          <table>
            <thead>
              <tr>
                <th>Filiere Name</th>
                <th>Description</th>
                <th>Date de Creation</th>
                <th>Effectif</th>
                <th>Cordinateur</th>
                <th>departement</th>
                <th>Actions</th>
                
              </tr>
            </thead>
            <tbody>
              {filieres.map((filiere) => (
                <React.Fragment key={filiere._id}>
                  <tr>
                    <td>{filiere.Nom}</td>
                    <td>
                      {filiere.Description.length > 50
                        ? filiere.Description.substring(0, 50) + "..."
                        : filiere.Description}
                    </td>
                    <td>{filiere.Date_Creation.split("T")[0]}</td>
                    <td>{filiere.Effectif}</td>
                    <td>{coords[filiere._id] ? coords[filiere._id] : ""}</td>
                    <td>
                      {FiliereDepartement[filiere._id]
                        ? FiliereDepartement[filiere._id]
                        : ""}
                    </td>
                    <td>
                      <Link
                        className="btn-modify"
                        to={"/Add/Option/" + filiere._id}
                      >
                       +Option
                      </Link>
                      <Link
                        className="btn-modify"
                        to={"/modify/filiere/" + filiere._id}
                      >
                        Modify
                      </Link>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteFiliere(filiere._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn-modify"
                        onClick={() =>
                          setShowOptions({
                            ...showOptions,
                            [filiere._id]: !showOptions[filiere._id],
                          })
                        }
                      >
                        {showOptions[filiere._id]
                          ? "Hide Options"
                          : "Show Options"}
                      </button>
                    </td>
                  </tr>
                  {showOptions[filiere._id] && filiere.Options && (
                    <tr>
                      <td colSpan="9">
                        <table className="options-table">
                          <thead>
                            <tr>
                              <th>Option Name</th>
                              <th>Description</th>
                              <th>Date Created</th>
                              <th>Effectif</th>
                              <th>Emploi_temps</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filiere.Options.map((option) => (
                              <tr key={option._id}>
                                <td>{option.Nom}</td>
                                <td>{option.Description}</td>
                                <td>{option.Date_Creation.split("T")[0]}</td>
                                <td>{option.effectif}</td>
                                <td>
                                  <Link
                                    className="btn-modify"
                                    to={"/modify/Option/" + option._id}
                                  >
                                    edit
                                  </Link>
                                  <Link
                                    className="btn-modify"
                                    to={"/Emploi_temps/" + option._id}
                                  >
                                    view
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === "professeurs" && (
          <table>
            <thead>
              <tr>
                <th>Nom & Prénom</th>
                <th>Email</th>
                <th>CIN</th>
                <th>Telephone</th>
                <th>grade</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {professeurs.map((professeur) => (
                <tr key={professeur._id}>
                  <td>{professeur.FullName} </td>
                  <td>{professeur.email}</td>
                  <td>{professeur.CIN}</td>
                  <td>{professeur.PhoneNumber}</td>
                  <td>{professeur.grade}</td>
                  <td>
                    <Link
                      className="btn-modify"
                      to={"/modify/professeur/" + professeur._id}
                    >
                      modify
                    </Link>
                    <button 
                      className="btn-delete"
                      onClick={()=>handleDeleteProfesseur(professeur._id)}
                    >
                      delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {activeTab === "reunions" && (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>lieu</th>
                <th>Departement</th>
                <th>Liste Ordres de Jour</th>
                <th>prof. presents</th>
                <th>PV</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reunion.map((reunion) => (
                <tr key={reunion._id}>
                  <td>{reunion.Date}</td>
                  <td>{reunion.Lieu}</td>
                  <td>
                    {ReunionDepartement[reunion._id]
                      ? ReunionDepartement[reunion._id]
                      : ""}
                  </td>
                  <td>
                    {reunion.LOJ.map((loj) => (
                      <p key={loj} className="loj">
                        {"-"} {loj}
                        {"\n"}
                      </p>
                    ))}
                  </td>
                  <td>
                    {ReunionProfs[reunion._id].map((prof) => (
                      <p key={prof} className="prof">
                        {prof}
                      </p>
                    ))}
                  </td>
                  <td>
                    <Link className="btn-modify" to={"/PV/" + reunion._id}>
                      view
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="btn-modify"
                      to={"/modify/reunion/" + reunion._id}
                    >
                      modify
                    </Link>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteReunion(reunion._id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DataTable;
