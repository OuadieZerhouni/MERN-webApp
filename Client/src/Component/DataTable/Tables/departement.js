import React from "react";
import { Link } from "react-router-dom";

function DepartementTable({
  activeTab,
  departements,
  chefs,
  ShowInfo,
  handleDeleteDepartement,
  _departement=false,
  IsAdmin=false,
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
                <th>Actions</th>
                
              </tr>
            </thead>
            <tbody>
              {departements.map((departement) => (
                <tr key={departement._id}>
                  <td>{departement.Nom}</td>
                <td>
                  {departement.description.length > 50 ? (
                    <>
                      {departement.description.substring(0, 50)}...
                      <p
                        style={{
                          display: "inline",
                          cursor: "pointer",
                          color: "blue",
                        }}
                        onClick={() =>
                          ShowInfo(departement.Nom, departement.description)
                        }
                      >
                        read more
                      </p>
                    </>
                  ) : (
                    departement.description
                  )}
                </td>

                  <td>{departement.Date_Creation.substring(0, 10)}</td>
                  <td>
                    {chefs[departement._id] ? chefs[departement._id] : ""}
                  </td>
                  {departement._id === _departement['_id'] || IsAdmin ? (
                    <td>
                      {IsAdmin ? (  <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDeleteDepartement(departement._id);
                        }}
                      >
                        Delete
                      </button> ) : ( <></> ) }
                     
                    <Link to={`/modify/departement/${departement._id}`}>
                      <button className="btn btn-primary">Edit</button>
                    </Link>
                    </td>
                  ) : (
                    <td>
                    </td>
                  )}

                 
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </>
  );
}

export default DepartementTable;