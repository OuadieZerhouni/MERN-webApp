import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

function FiliereComponent({
  activeTab,
  filieres,
  coords,
  FiliereDepartement,
  handleDeleteFiliere,
  handleDeleteOption,
  _departement = false,
  ShowInfo,
  IsAdmin = false,
}) {
  const [showOptions, setShowOptions] = useState({});

  return (
    <div className="table-container">
      {activeTab === "filiere" && (
        <>
          {IsAdmin || _departement ? (
            <Link to="/Add/Filiere">
              <button className="Insert-Btn">Insérer Filiere</button>
            </Link>
          ) : (
            <></>
          )}
          <table>
            <thead>
              <tr>
                <th>Nom de filière</th>
                <th>Description</th>
                <th>Date de création</th>
                <th>Effectif</th>
                <th>Cordinateur</th>
                <th>département</th>
                <th>Actions</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {filieres.map((filiere) => (
                <React.Fragment key={filiere._id}>
                  <tr>
                    <td>{filiere.Nom}</td>
                    <td>
                      {filiere.Description.length > 25 ? (
                        <>
                          {filiere.Description.substring(0, 25)+'...'}
                          <p
                            style={{
                              display: "inline",
                              cursor: "pointer",
                              color: "blue",
                            }}
                            onClick={() =>
                              ShowInfo(filiere.Nom, filiere.Description)
                            }
                          >
                            Voir plus
                          </p>
                        </>
                      ) : (
                        filiere.Description
                      )}
                    </td>
                    <td>{filiere.Date_Creation.split("T")[0]}</td>
                    <td>{filiere.Effectif}</td>
                    <td>{coords[filiere._id] ? coords[filiere._id] : ""}</td>
                    <td>
                      {FiliereDepartement[filiere._id]
                        ? FiliereDepartement[filiere._id]
                        : ""}
                    </td>
                  <td>  {(filiere.id_departement === _departement["_id"] ||
                    IsAdmin) ? (
                      <>
                        <Link to={`/modify/filiere/${filiere._id}`}>
                          <button className="btn btn-primary"><i className="fa-solid fa-pen"></i></button>
                        </Link>

                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDeleteFiliere(filiere._id);
                          }}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </>
                    ) : (
                      ""
                    )}</td>

                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          setShowOptions({
                            ...showOptions,
                            [filiere._id]: !showOptions[filiere._id], 
                          })
                        }
                      >
                        {showOptions[filiere._id]
                          ? <i className="fa-solid fa-eye-slash"></i>
                          : <i className="fa-solid fa-eye"></i>}
                      </button>
                      {(filiere.id_departement === _departement["_id"] ||
                    IsAdmin) ? (
                      <Link to={`/add/option/${filiere._id}`}>
                          <button className="btn btn-primary">
                          <i className="fa-solid fa-plus"></i>
                          </button>
                        </Link>
                    ) : (
                      ""
                    )}
                    </td>
                  </tr>
                  {showOptions[filiere._id] && filiere.Options && (
                    <tr>
                      <td colSpan="8">
                        <table className="table-container">
                          <thead>
                            <tr>
                              <th>Nom d'Option</th>
                              <th>Description</th>
                              <th>Date de Création</th>
                              <th>Effectif</th>
                              <th>Emploi du temps</th>
                              <th>Actions</th>
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
                                    to={"/Emploi_temps/" + option._id}
                                  >
                                    accéder
                                  </Link>
                                </td>
                                {filiere.id_departement ===
                                  _departement["_id"] || IsAdmin ? (
                                  <td>
                                    <Link to={`/modify/option/${option._id}`}>
                                      <button className="btn btn-primary">
                                      <i className="fa-solid fa-pen" ></i>
                                      </button>
                                    </Link>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => {
                                        handleDeleteOption(option._id);
                                      }}
                                    >
                                      <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                  </td>
                                ) : (
                                  ""
                                )}
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
        </>
      )}
    </div>
  );
}

export default FiliereComponent;
