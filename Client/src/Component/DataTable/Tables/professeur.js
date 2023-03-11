import React from "react";
import { Link } from "react-router-dom";

function ProfesseursTable({
  activeTab,
  professeurs,
  handleDeleteProfesseur,
  _departement = false,
  IsAdmin,
}) {
  return (
    <>
      {activeTab === "professeurs" && (
        <>
          {IsAdmin || _departement ? (
            <Link to="/Add/Professeur">
              <button className="Insert-Btn">Insert Professeur</button>
            </Link>
          ) : (
            <></>
          )}
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
                  {professeur.id_departement === _departement["_id"] ||
                  IsAdmin ? (
                    <td>
                      <Link to={`/modify/professeur/${professeur._id}`}>
                        <button className="btn btn-primary"><i className="fa-solid fa-pen"></i></button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDeleteProfesseur(professeur._id);
                        }}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  ) : (
                    <td></td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default ProfesseursTable;
