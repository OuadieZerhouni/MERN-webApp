import React from "react";
import { Link } from "react-router-dom";

function Reunion({
  activeTab,
  reunions,
  ReunionDepartement,
  ReunionProfs,
  handleDeleteReunion,
  _departement = false,
  IsAdmin = false,
}) {
  return (
    <div className="table-container">
      {activeTab === "reunions" && (
        <>
          {IsAdmin || _departement ? (
            <Link to="/Add/Reunion">
              <button className="Insert-Btn">insérer Reunion</button>
            </Link>
          ) : (
            <></>
          )}
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Lieu</th>
                <th>Département</th>
                <th>Liste Ordres de Jour</th>
                <th>Profs. presents</th>
                <th>PV</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reunions.map((reunion) => (
                <tr key={reunion._id}>
                  <td>{reunion.Date}</td>
                  <td>{reunion.Lieu}</td>
                  <td>
                    {ReunionDepartement[reunion._id]
                      ? ReunionDepartement[reunion._id]
                      : ""}
                  </td>
                  <td>
                    {reunion.LOJ.map((loj) => (
                      <p key={loj} className="loj">
                        {"-"} {loj}
                        {"\n"}
                      </p>
                    ))}
                  </td>
                  <td>
                    {ReunionProfs[reunion._id]
                      ? ReunionProfs[reunion._id].map((prof) => (
                          <p key={prof} className="prof">
                            {"-" + prof}
                          </p>
                        ))
                      : "none"}
                  </td>
                  <td>
                    <Link className="btn-modify" to={"/PV/" + reunion._id}>
                      voir
                    </Link>
                  </td>

                  {reunion.id_departement === _departement["_id"] || IsAdmin ? (
                    <td>
                      <Link to={`/modify/reunion/${reunion._id}`}>
                        <button className="btn btn-primary">
                          <i className="fa-solid fa-pen"></i>
                        </button>
                      </Link>

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDeleteReunion(reunion._id);
                        }}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Reunion;
