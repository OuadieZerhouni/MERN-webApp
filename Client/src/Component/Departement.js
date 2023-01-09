import React, { useState } from 'react';
import axios from 'axios';

const DepartementForm = () => {
  const [departementNom, setDepartementNom] = useState('');
  const [departementDescription, setDepartementDescription] = useState('');
  const [departementDateCreation, setDepartementDateCreation] = useState('');
  const [departementIdChef, setDepartementIdChef] = useState('');
  const [departementProfesseurs, setDepartementProfesseurs] = useState([]);
  const [departementFilieres, setDepartementFilieres] = useState([]);
  const [responseData, setResponseData] = useState(null);

  const handleInsertDepartement = () => {
    axios.post('/insert/departement', {
      Nom: departementNom,
      description: departementDescription,
      Date_Creation: departementDateCreation,
      id_Chef: departementIdChef,
      professeurs: departementProfesseurs,
      Filieres: departementFilieres
    })
      .then(response => {
        setResponseData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <form>
      <label htmlFor="departement-nom">Departement Nom:</label>
      <input
        type="text"
        id="departement-nom"
        value={departementNom}
        onChange={e => setDepartementNom(e.target.value)}
      />
      <br />
      <label htmlFor="departement-description">Departement Description:</label>
      <input
        type="text"
        id="departement-description"
        value={departementDescription}
        onChange={e => setDepartementDescription(e.target.value)}
      />
      <br />
      <label htmlFor="departement-date-creation">Departement Date Creation:</label>
      <input
        type="text"
        id="departement-date-creation"
        value={departementDateCreation}
        onChange={e => setDepartementDateCreation(e.target.value)}
      />
      <br />
      <label htmlFor="departement-id-chef">Departement Id Chef:</label>
      <input type="text" id="departement-id-chef" value={departementIdChef} onChange={e => setDepartementIdChef(e.target.value)}
      />
      <br />
      <label htmlFor="departement-professeurs">Departement Professeurs:</label>
      <input type="text" id="departement-professeurs" value={departementProfesseurs} onChange={e => setDepartementProfesseurs(e.target.value)}
      />
      <br />
      <label htmlFor="departement-filieres">Departement Filieres:</label>
      <input type="text" id="departement-filieres" value={departementFilieres} onChange={e => setDepartementFilieres(e.target.value)}
      />
      <br />
      <button type="button" onClick={handleInsertDepartement}>Insert Departement</button>
      <br />
      


