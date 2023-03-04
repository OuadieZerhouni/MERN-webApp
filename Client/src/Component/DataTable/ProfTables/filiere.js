import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

function FiliereComponent({ activeTab, filieres, coords, FiliereDepartement }) {
  const [showOptions, setShowOptions] = useState({});

  return (
    <>
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
        <button
          className="btn-modify"
          onClick={() =>
            setShowOptions({
              ...showOptions,
              [filiere._id]: !showOptions[filiere._id],
            })
          }
        >
          {showOptions[filiere._id] ? "Hide Options" : "Show Options"}
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
        </>
    );
}

export default FiliereComponent;

                                

