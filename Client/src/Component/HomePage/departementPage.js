import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../CSS/ComponentCSS/DepartementsPage.css";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [filieres, setFilieres] = useState([]);

  const API_Database = process.env.REACT_APP_API_DATABASE;

  const handleDepartmentClick = async (departement) => {
    if (selectedDepartment && selectedDepartment === departement)
      setSelectedDepartment(null);
    else setSelectedDepartment(departement);
  };

  const getFilieres = (Id, filieres) => {
    console.log(filieres);
    return filieres.filter((filiere) => filiere.id_departement === Id);
  };
  useEffect(() => {
    axios.get(`${API_Database}/departements`, {}).then((res) => {
      axios
        .get(`${API_Database}/filieres`, {})
        .then((response) => {
          setFilieres(response.data);
          res.data.forEach((departement) => {
            departement.filieres = getFilieres(departement._id, response.data);
          });
          setDepartments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  return (
    <div className="departement-list-container">
      <h2 className="departement-list-heading">Departements</h2>
      <ul className="departement-list">
        {departments.map((departement) => (
          <li key={departement._id} className="departement-list-item">
            <h3 onClick={() => handleDepartmentClick(departement)}>
              {departement.Nom}
            </h3>
            {selectedDepartment &&
              selectedDepartment._id === departement._id && (
                <div className="departement-details">
                  <p className="departement-description">
                    Description : {selectedDepartment.description}
                  </p>
                  <p className="departement-description">
                    creé en :{selectedDepartment.Date_Creation}
                  </p>
                  <h4 className="departement-filiere-heading">Filières</h4>
                  <ul className="departement-filieres">
                    {departement.filieres.map((filiere) => (
                      <li key={filiere._id} className="departement-filiere">
                        <p>{filiere.Nom}</p>{" "}
                        <p> Creé en : {filiere.Date_Creation}</p>
                        <p>Description : {filiere.Description}</p>
                        <p>Effectif : {filiere.Effectif}</p>
                        <h5 className="departement-filiere-options-heading">Options</h5>
                        <ul className="departement-filiere-options">
                          {filiere.Options.map((option) => (
                            <li key={option._id} className="departement-filiere-options">
                              <p>{option.Nom}</p>
                              <p>Creé en : {option.Date_Creation}</p>
                              <p>Description : {option.Description}</p>
                              <p>Effectif : {option.Effectif}</p>
                              <p>Emploi du temps : <a href={"/Emploi_temps/"+option._id} target="_blank">Emploi du temps</a></p>

                      </li>

                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>


  );
};

export default DepartmentList;
