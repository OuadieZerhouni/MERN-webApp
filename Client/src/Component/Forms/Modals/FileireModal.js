import React from "react";
import ReactDom from "react-dom";
import { useState } from "react";
import "../FormsCSS/Modal.css";

export default function FiliereModal({
  IsOpen,
  toggleModal,
  filieres,
  handleFiliereSelection,
  AlreadySelectedFilieres,
}) {
  const [selectedFilieres, setSelectedFilieres] = useState([]);
  if (!IsOpen) return null;

  const handleClick = (li, id) => {
    if (selectedFilieres.find((_id) => _id === id)) {
      setSelectedFilieres(selectedFilieres.filter((_id) => _id !== id));
      li.target.classList.remove("selected"); 
    } else {
      setSelectedFilieres([...selectedFilieres,id]);
      li.target.classList.add("selected");
    }
  }

  return ReactDom.createPortal(
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h2>Select Filieres</h2>
        <ul>
          {filieres.map((filiere) => (
            <li
              key={filiere._id}
              onClick={(e) => handleClick(e, filiere._id)}
              className={`${AlreadySelectedFilieres.includes(filiere._id) ? "selected" : ""}`}
            >
              {filiere.Nom}
            </li>
          ))}
        </ul>
        <button className="close-modal" onClick={toggleModal}>
          CLOSE
        </button>
        <button
          className="Confirm-button"
          onClick={() => handleFiliereSelection(selectedFilieres)}
        >
          Confirmer
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
