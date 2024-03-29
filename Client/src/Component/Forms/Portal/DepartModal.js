import React from "react";
import ReactDom from "react-dom";
import "../../../CSS/FormsCSS/Modal.css";

export default function DepartModal({
  IsOpen,
  toggleModal,
  Departements,
  handleDepartementSelection,
}) {
  if (!IsOpen) return null;
  return ReactDom.createPortal(
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h2>Selectionez le Departement Parent du Filiere</h2>

        <ul className="modal-ul">
          {Departements.map((Departement) => (
            <li className="modal-list"
              key={Departement._id}
              onClick={() => handleDepartementSelection(Departement)}
            >
              {Departement.Nom}
            </li>
          ))}
        </ul>
        <button className="close-modal" onClick={toggleModal}>
          CLOSE
        </button>
        <button className="Deselect-modal" onClick={() => handleDepartementSelection(null)}>
          Aucun
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
