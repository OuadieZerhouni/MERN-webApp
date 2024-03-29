import React from "react";
import ReactDom from "react-dom";
import { useState,useEffect } from "react";
import "../../../CSS/FormsCSS/Modal.css";

export default function ProfModal({
  IsOpen,
  toggleModal,
  professeurs,
  handelProfselection,
  AlreadySelectedProf
}) {
  const [selectedProf, setSelectedProf] = useState([]);
  useEffect(() => {
    setSelectedProf(AlreadySelectedProf);
  }, [AlreadySelectedProf]);
  if (!IsOpen) return null;
  

  const handelClick = (li , id) => {
    
    if (selectedProf.find((_id) => _id === id)) {
        setSelectedProf(selectedProf.filter((_id) => _id !== id));
        li.target.classList.remove("selected"); 
    } else {
        setSelectedProf([...selectedProf,id]);
        li.target.classList.add("selected");
    }
}
return ReactDom.createPortal(
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h2>Selectionez Les Porfesseurs</h2>

        <ul className="modal-ul">
          {professeurs.map((professeur) => (
            <li
              key={professeur._id}
              onClick={(e) => handelClick(e ,professeur._id)}
              className={`modal-list ${AlreadySelectedProf.includes(professeur._id) ? "selected" : ""}`}
            >
              {professeur.FullName} : {"(" + professeur.email + ")"}
            </li>
          ))}
        </ul>
        <button className="close-modal" onClick={toggleModal}>
          CLOSE
        </button>
        <button
          className="Confirm-button"
          onClick={() => handelProfselection(selectedProf)}
        >
          Confirmer
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
