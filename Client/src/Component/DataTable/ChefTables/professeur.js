import React from "react";
import { Link } from "react-router-dom";

function ProfesseursTable({ activeTab, professeurs, handleDeleteProfesseur, _departement }) {
  return (
    <>
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
                {professeur.id_departement === _departement["_id"] ? (
                  <td>
                    <Link to={`/modify/professeur/${professeur._id}`}>
                      <button className="btn btn-primary">Edit</button>
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDeleteProfesseur(professeur._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                ) : (
                  <td></td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default ProfesseursTable;
