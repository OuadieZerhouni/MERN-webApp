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
    <>
      {activeTab === "filiere" && (
        <>
          {IsAdmin || _departement ? (
            <Link to="/Add/Filiere">
              <button className="Insert-Btn">Insert Filiere</button>
            </Link>
          ) : (
            <></>
          )}
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
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {filieres.map((filiere) => (
                <React.Fragment key={filiere._id}>
                  <tr>
                    <td>{filiere.Nom}</td>
                    <td>
                      {filiere.Description.length > 50 ? (
                        <>
                          filiere.Description.substring(0, 50) ...{" "}
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
                            read more
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
                    {filiere.id_departement === _departement["_id"] ||
                    IsAdmin ? (
                      <td>
                        <Link to={`/modify/filiere/${filiere._id}`}>
                          <button className="btn btn-primary"><i className="fa-solid fa-pen"></i></button>
                        </Link>
                        <Link to={`/add/option/${filiere._id}`}>
                          <button className="btn btn-primary">
                          <i className="fa-solid fa-plus">Option</i>
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDeleteFiliere(filiere._id);
                          }}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </td>
                    ) : (
                      ""
                    )}

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
                          ? <i className="fa-solid fa-eye-slash"></i>
                          : <i className="fa-solid fa-eye"></i>}
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
                                    view
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
    </>
  );
}

export default FiliereComponent;
