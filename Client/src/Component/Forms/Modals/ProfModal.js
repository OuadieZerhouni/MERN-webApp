import React from 'react'
import ReactDom from 'react-dom'
import './Modal.css'


export default function Modal({ open,toggleModal,professeurs ,handleChefSelection}) {
  if (!open) return null

  return ReactDom.createPortal(
    <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Selectionez le Chef de Departement</h2>
            
            <ul>
            {professeurs.map((professeur) => (
              <li
                key={professeur._id}
                onClick={() => handleChefSelection( [ professeur._id , professeur.FullName])}
              >
                {professeur.FullName}
              </li> ))} </ul>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>,
    document.getElementById('portal')
  )
}

