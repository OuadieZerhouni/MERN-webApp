import React from "react";
import ReactDom from "react-dom";
import "../../../CSS/FormsCSS/Modal.css";

export default function FiliereModal({
  IsOpen,
  toggleModal,
  filieres,
  handleFiliereSelection,
}) {

  if (!IsOpen) return null;
  return ReactDom.createPortal(
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h2>Select Filieres</h2>
        <ul className="modal-ul">
          {filieres.map((filiere) => (
            <li 
              key={filiere._id}
              onClick={()=>handleFiliereSelection(filiere)}
              className="modal-list"
            >
              {filiere.Nom}
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
