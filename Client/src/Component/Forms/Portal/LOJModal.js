import React, { useState } from "react";
import ReactDom from "react-dom";
import "../../../CSS/FormsCSS/Modal.css";

export default function LOJModal({ IsOpen, toggleModal, handleLOJ, PrevLOJ }) {
  const [loj1, set_loj1] = useState("");
  const [loj2, set_loj2] = useState("");
  const [loj3, set_loj3] = useState("");
  const [loj4, set_loj4] = useState("");
  const [loj5, set_loj5] = useState("");
  const [loj6, set_loj6] = useState("");
  const [loj7, set_loj7] = useState("");

  if (!IsOpen) return null;

  const handleConfirm = () => {
    const lojs = [loj1, loj2, loj3, loj4, loj5, loj6, loj7];
    const filteredLojs = lojs.filter((loj) => loj !== "");
    handleLOJ([...filteredLojs]);
  };


  return ReactDom.createPortal(
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h1> entrer Liste Ordre du jour</h1>
        1 
        <input
          className="Modal-input"
          type="text"
          id="reunion-loj-1"
          onChange={(e) => set_loj1(e.target.value)}
          value={loj1}
        />
        <br />
        2 
        <input
          className="Modal-input"
          type="text"
          id="reunion-loj-2"
          onChange={(e) => set_loj2(e.target.value)}
          value={loj2}
        />
        <br />
        3 
        <input
          className="Modal-input"
          type="text"
          id="reunion-loj-3"
          onChange={(e) => set_loj3(e.target.value)}
          value={loj3}
        />
        <br />
        4 
        <input
          className="Modal-input"
          type="text"
          id="reunion-loj-4"
          onChange={(e) => set_loj4(e.target.value)}
          value={loj4}
        />
        <br />
        5 
        <input
          className="Modal-input"
          type="text"
          id="reunion-loj-5"
          onChange={(e) => set_loj5(e.target.value)}
          value={loj5}
        />
        <br />
        6 
        <input
          className="Modal-input"
          type="text"
          id="reunion-loj-6"
          onChange={(e) => set_loj6(e.target.value)}
          value={loj6}
        />
        <br />
        7 
        <input
          className="Modal-input"
          type="text"
          id="reunion-loj-7"
          onChange={(e) => set_loj7(e.target.value)}
          value={loj7}
        />
        <br />
        <button className="Confirm-button" onClick={handleConfirm}>
          Confirmer
        </button>
        <button className="close-modal" onClick={toggleModal}>
          Annuler
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
