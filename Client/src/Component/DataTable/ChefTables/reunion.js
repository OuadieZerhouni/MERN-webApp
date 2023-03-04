import React from "react";
import { Link } from "react-router-dom";

function Reunion({
  activeTab,
  reunions,
  ReunionDepartement,
  ReunionProfs,
  handleDeleteReunion,
  _departement,
}) {
  return (
    <>
      {activeTab === "reunions" && (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>lieu</th>
                <th>Departement</th>
                <th>Liste Ordres de Jour</th>
                <th>prof. presents</th>
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
                      view
                    </Link>
                  </td>

                  {reunion.id_departement === _departement["_id"] ? (
                    <td>
                      <Link to={`/modify/reunion/${reunion._id}`}>
                        <button className="btn btn-primary">Edit</button>
                      </Link>

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDeleteReunion(reunion._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </>
  );
}

export default Reunion;
