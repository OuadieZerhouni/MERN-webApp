import React from "react";
import { Link } from "react-router-dom";

function DepartementTable({
  activeTab,
  departements,
  chefs,
  handleDeleteDepartement,
}) {
  return (
    <>
      {activeTab === "departements" && (
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
            {departements.map((departement) => (
              <tr key={departement._id}>
                <td>{departement.Nom}</td>
                <td>
                  {departement.description.length > 50
                    ? departement.description.substring(0, 50) + "..."
                    : departement.description}
                </td>

                <td>{departement.Date_Creation.substring(0, 10)}</td>
                <td>{chefs[departement._id] ? chefs[departement._id] : ""}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteDepartement(departement._id)}
                  >
                    delete
                  </button>
                  <Link
                    className="btn-modify"
                    to={"/modify/departement/" + departement._id}
                  >
                    modify
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default DepartementTable;
