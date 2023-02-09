import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ComponentCSS/DataTable.css";

const DataTable = () => {
  const [activeTab, setActiveTab] = useState("departments");
  const [departments, setDepartments] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);
  const [reunion, setReunion] = useState([]);
  const [chefs, setChefs] = useState({});
  const [coords, setCoords] = useState({});
  const [FiliereDepartement, setFiliereDepartement] = useState({});
  const [ReunionDepartement, setReunionDepartement] = useState({});

  const API_DATABASE = process.env.REACT_APP_API_DATABASE;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  useEffect(() => {
    document.title = "Dashboard";
    const getChefDepartement = async (id) => {
      return axios
        .post(
          API_DATABASE + "/get/professeur/id",
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
          API_DATABASE + "/get/professeur/id",
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
          API_DATABASE + "/get/departement/id",
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

    //departments
    axios
      .post(
        API_DATABASE + "/get/departement/all",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        setDepartments(response.data);
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
        API_DATABASE + "/get/filiere/all",
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
          const departementName = await getDepartFiliere(filiere.id_departement)
            .then((departementName) => {
              return departementName;
            })
            .catch((error) => {
              console.error(error);
            });
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
        API_DATABASE + "/get/professeur/all",
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
    //reunion
    axios
      .post(
        API_DATABASE + "/get/reunion/all",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        setReunion(response.data);
        response.data.forEach(async (reunion) => {
          const departementName = await getDepartFiliere(reunion.id_departement)
            .then((departementName) => {
              return departementName;
            })
            .catch((error) => {
              console.error(error);
            });
          setReunionDepartement((prevState) => ({
            ...prevState,
            [reunion._id]: departementName,
          }));
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
          className={`tab ${activeTab === "departments" ? "active" : ""}`}
          onClick={() => handleTabClick("departments")}
        >
          Departments
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
        {activeTab === "departments" && (
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
              {departments.map((departement) => (
                <tr key={departement._id}>
                  <td>{departement.Nom}</td>
                  <td>
                    {departement.description.length > 50
                      ? departement.description.substring(0, 50) + "..."
                      : departement.description}
                  </td>

                  <td>{departement.Date_Creation}</td>
                  <td>
                    {chefs[departement._id] ? chefs[departement._id] : ""}
                  </td>
                  <td>
                    <Link className="btn btn-primary"  to={"/modify/departement/" + departement._id}>
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
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {filieres.map((filiere) => (
                <tr key={filiere._id}>
                  <td>{filiere.Nom}</td>
                  <td>
                    {filiere.Description.length > 50
                      ? filiere.Description.substring(0, 50) + "..."
                      : filiere.Description}
                  </td>
                  <td>{filiere.Date_Creation}</td>
                  <td>{filiere.Effectif}</td>
                  <td>{coords[filiere._id] ? coords[filiere._id] : ""}</td>
                  <td>
                    {FiliereDepartement[filiere._id]
                      ? FiliereDepartement[filiere._id]
                      : ""}
                  </td>
                  <td>
                    {filiere.Options.map((option) => (
                      <div key={option._id}>
                        <p>{option.Nom}</p>
                        <p>{option.Description}</p>
                      </div>
                    ))}
                  </td>
                </tr>
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
              </tr>
            </thead>
            <tbody>
              {reunion.map((reunion) => (
                <tr key={reunion._id}>
                  <td>{reunion.Date}</td>
                  <td>{reunion.lieu}</td>
                  <td>
                    {ReunionDepartement[reunion._id]
                      ? ReunionDepartement[reunion._id]
                      : ""}
                  </td>
                  <td>
                    {reunion.LOJ.map((loj) => (
                      <p key={loj} className="loj">
                        {loj.Sujet}
                      </p>
                    ))}
                  </td>
                  <td>
                    {reunion.prof_present.map((prof) => (
                      <p key={prof} className="prof">
                        {prof}
                      </p>
                    ))}
                  </td>
                  <td>{reunion.PV.link}</td>
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
