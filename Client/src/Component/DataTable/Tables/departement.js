import React from "react";
import { Link } from "react-router-dom";

function DepartementTable({
  activeTab,
  departements,
  chefs,
  ShowInfo,
  handleDeleteDepartement,
  _departement = false,
  IsAdmin = false,
}) {
  return (
    <div className="table-container">
      {activeTab === "departements" && (
        <>
          {IsAdmin && (
            <Link to="/Add/Departement">
              <button className="Insert-Btn">Insert Departement</button>
            </Link>
          )}
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
              {departements.map((departement) => {
                const { _id } = departement;
                return (
                  <tr key={_id}>
                    <td>{departement.Nom}</td>
                    <td>
                      {departement.description.length > 50 ? (
                        <>
                          {`${departement.description.substring(0, 50)}...`}
                          <p
                            style={{
                              display: "inline",
                              cursor: "pointer",
                              color: "blue",
                            }}
                            onClick={() =>
                              ShowInfo(
                                departement.Nom,
                                departement.description
                              )
                            }
                          >
                            read more
                          </p>
                        </>
                      ) : (
                        departement.description
                      )}
                    </td>
                    <td>{`${departement.Date_Creation.substring(0, 10)}`}</td>
                    <td>{chefs[_id] && chefs[_id]}</td>
                    {_id === _departement["_id"] || IsAdmin ? (
                      <td>
                        {IsAdmin && (
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteDepartement(_id)}
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        )}
                        <Link to={`/modify/departement/${_id}`}>
                          <button className="btn btn-primary">
                            <i className="fa-solid fa-pen"></i>
                          </button>
                        </Link>
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default DepartementTable;