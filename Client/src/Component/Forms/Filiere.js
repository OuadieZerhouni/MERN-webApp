import React, { useState } from 'react';
import axios from 'axios';

const FiliereForm = () => {
  const [filiereNom, setFiliereNom] = useState('');
  const [filiereDateCreation, setFiliereDateCreation] = useState('');
  const [filiereIdDepartement, setFiliereIdDepartement] = useState('');
  const [filiereOptions, setFiliereOptions] = useState([]);
  const [responseData, setResponseData] = useState(null);

  let API_DATABASE=process.env.REACT_APP_API_DATABASE;

  const handleInsertFiliere = () => {
    axios
      .post(API_DATABASE+'/insert/filiere', {
        Nom: filiereNom,
        Date_Creation: filiereDateCreation,
        id_Departement: filiereIdDepartement,
        options: filiereOptions,
      })
      .then(response => {
        setResponseData(JSON.stringify(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleGetAllFilieres = () => {
    axios
      .post(API_DATABASE+'/get/filiere/all', {})
      .then(response => {
        setResponseData(JSON.stringify(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  };




  return (
    <form className="form">
      <label htmlFor="filiere-nom" className="form-label">
        Filiere Nom:
      </label>
      <input
        className="form-input"
        type="text"
        id="filiere-nom"
        value={filiereNom}
        onChange={e => setFiliereNom(e.target.value)}
      />
      <br />
      <label htmlFor="filiere-date-creation" className="form-label">
        Filiere Date Creation:
      </label>
      <input
        className="form-input"
        type="text"
        id="filiere-date-creation"
        value={filiereDateCreation}
        onChange={e => setFiliereDateCreation(e.target.value)}
      />
      <br />
      <label htmlFor="filiere-id-departement" className="form-label">
        Filiere Id Departement:
      </label>
      <input
        className="form-input"
        type="text"
        id="filiere-id-departement"
        value={filiereIdDepartement}
        onChange={e => setFiliereIdDepartement(e.target.value)}
      />
      <br />
      <label htmlFor="filiere-options" className="form-label">
        Filiere Options:
      </label>
      <input
        className="form-input"
        type="text"
        id="filiere-options"
        value={filiereOptions}
        onChange={e => setFiliereOptions(e.target.value)}
      />
      <br />
      <button
        className="form-button"
        type="button"
        onClick={handleInsertFiliere}
      >
        Insert Filiere
      </button>
      <button
        className="form-button"
        type="button"
        onClick={handleGetAllFilieres}
      >
        Get All Filieres
      </button>
      
      <div className="response-data">{responseData}</div>
    </form>
  );
};

export default FiliereForm;

