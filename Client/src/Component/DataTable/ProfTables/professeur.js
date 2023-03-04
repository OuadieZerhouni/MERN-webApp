import React from "react";

function ProfesseursTable({ activeTab, professeurs }) {

  
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
    </>
  );
}

export default ProfesseursTable;
