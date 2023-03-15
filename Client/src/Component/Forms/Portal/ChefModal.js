import React from "react";
import ReactDom from "react-dom";
import "../../../CSS/FormsCSS/Modal.css";
export default function ChefModal({ IsOpen, toggleModal, professeurs, handleChefSelection }) {
  return (
    ReactDom.createPortal(
      <>{IsOpen &&
        (

        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Selectionez le Chef de Departement</h2>
            <ul className="modal-ul">
              {professeurs.map(({ _id, FullName, email }) => (
                <li className="modal-list" key={_id} onClick={() => handleChefSelection([_id, FullName])}>
                  {FullName} : {"(" + email + ")"}
                </li>
              ))}
            </ul>
            <button className="close-modal" onClick={toggleModal}>CLOSE</button>
            <button className="Deselect-modal" onClick={() => handleChefSelection([null,'Not Selected'])}>Deselect</button>
          </div>
        </div>
        )}
      </>,
      document.getElementById("portal")
    )
  );
}
