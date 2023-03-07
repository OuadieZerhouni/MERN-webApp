import React from "react";
import ReactDom from "react-dom";
import "../../../CSS/FormsCSS/Modal.css";

export default function DepartData({IsOpen, toggleModal, title,description}) {
  if (!IsOpen) return null;

  return ReactDom.createPortal(
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <div className="depart-data-title">
          <span>Description</span>
        </div>
        <div className="depart-data-content">
          <h3>{title}</h3>
            <p className="Description-Portal"
            >{description}</p>

        </div>
      </div>
    </div>
    ,document.getElementById("portal")
  );
}
