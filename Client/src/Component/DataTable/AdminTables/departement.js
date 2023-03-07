import React from "react";
import { Link } from "react-router-dom";
import DeparData  from "../Portal/DepartData";

function DepartementTable({
  activeTab,
  departements,
  chefs,
  handleDeleteDepartement,
}) {



  const [PortalOpen, setPortalOpen] = React.useState(false);
  const [ShowedDepart, setShowedDepart] = React.useState([]);

  const togglePortal = () => {
    setPortalOpen(!PortalOpen);
  };

  const DeparInfo = (id) => {
    setShowedDepart(departements.find((departement) => departement._id === id));
    togglePortal();
  };

  
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
                  {departement.description.length > 50 ? (
                    <>
                      {departement.description.substring(0, 50)}...
                      <p onClick={() => DeparInfo(departement._id)}>
                        read more
                      </p>
                    </>
                  ) : (
                    departement.description
                  )}
                </td>
                <DeparData IsOpen={PortalOpen} toggle={togglePortal} Departement={ShowedDepart} />


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
