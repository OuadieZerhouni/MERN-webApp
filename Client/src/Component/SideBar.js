import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ComponentCSS/SideBar.css";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("departments");
  const [departments, setDepartments] = useState([]);
  const [filiere, setFiliere] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);
  const [reunion, setReunion] = useState([]);
  const [professeurName, setProfesseurName] = useState("");
  const [chefs, setChefs] = useState({});

  const API_DATABASE = process.env.REACT_APP_API_DATABASE;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const getChefDepartement = async (id) => {
    return axios
      .post(
        API_DATABASE + "/get/professeur/id",
        { _id: id },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
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

  useEffect(() => {
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
    axios
      .post(
        API_DATABASE + "/get/filiere/all",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        setFiliere(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
      })
      .catch((error) => {
        console.error(error);
      });
  }, [API_DATABASE]);

  return (
    <div className="sidebar">
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
            <tbody>{
                filiere.map((filiere) => (
                    <tr key={filiere._id}>
                        <td>{filiere.Nom}</td>
                        <td>{filiere.description}</td>
                    </tr>
                ))
                
                }</tbody>
          </table>
        )}
        {activeTab === "professeurs" && (
          <table>
            <thead>
              <tr>
                <th>Professor Name</th>
                <th>Subjects Taught</th>
              </tr>
            </thead>
            <tbody>{/* Render professor data here */}</tbody>
          </table>
        )}
        {activeTab === "reunions" && (
          <table>
            <thead>
              <tr>
                <th>Meeting Title</th>
                <th>Date and Time</th>
              </tr>
            </thead>
            <tbody>{/* Render reunion data here */}</tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
