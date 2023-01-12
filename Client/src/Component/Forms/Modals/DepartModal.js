import React from "react";
import ReactDom from "react-dom";
import "../FormsCSS/Modal.css";

export default function DepartModal({
  IsOpen,
  toggleModal,
  Departements,
  handleDepartementSelection,
}) {
    console.log(IsOpen)
  if (!IsOpen) return null;
  return ReactDom.createPortal(
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h2>Selectionez le Departement Parent du Filiere</h2>

        <ul>
          {Departements.map((Departement) => (
            <li
              key={Departement._id}
              onClick={(e) => handleDepartementSelection(Departement)}
            >
              {Departement.Nom}
            </li>
          ))}
        </ul>
        <button className="close-modal" onClick={toggleModal}>
          CLOSE
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
