import React from "react";
import { Link } from "react-router-dom";

function ProfesseursTable({ activeTab, professeurs, handleDeleteProfesseur }) {

  
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
            <td>
              <Link
                className="btn-modify"
                to={"/modify/professeur/" + professeur._id}
              >
                modify
              </Link>
              <button
                className="btn-delete"
                onClick={() => handleDeleteProfesseur(professeur._id)}
              >
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
      )}
    </>
  );
}

export default ProfesseursTable;
