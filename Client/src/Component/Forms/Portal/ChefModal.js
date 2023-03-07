import React from "react";
import ReactDom from "react-dom";
import "../../../CSS/FormsCSS/Modal.css";

export default function ChefModal({
  IsOpen,
  toggleModal,
  professeurs,
  handleChefSelection,
}) {
  if (!IsOpen) return null;

  return ReactDom.createPortal(
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h2>Selectionez le Chef de Departement</h2>

        <ul className="modal-ul">
          {professeurs.map((professeur) => (
            <li
              className="modal-list"
              key={professeur._id}
              onClick={() =>
                handleChefSelection([professeur._id, professeur.FullName])
              }
            >
              {professeur.FullName} : {"(" + professeur.email + ")"}
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
