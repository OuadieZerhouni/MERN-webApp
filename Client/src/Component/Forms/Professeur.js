import React, { useState } from 'react';
import axios from 'axios';

const ProfesseurForm = () => {
  const [professeurCIN, setProfesseurCIN] = useState('');
  const [professeurPhoneNumber, setProfesseurPhoneNumber] = useState('');
  const [professeurFullName, setProfesseurFullName] = useState('');
  const [professeurEmail, setProfesseurEmail] = useState('');
  const [professeurPassword, setProfesseurPassword] = useState('');
  const [professeurDepartement, setProfesseurDepartement] = useState('');
  const [professeurRole, setProfesseurRole] = useState('');
  const [responseData, setResponseData] = useState(null);

  let API_DATABASE=process.env.REACT_APP_API_DATABASE;

  const handleInsertProfesseur = () => {
    axios
      .post(API_DATABASE+'/insert/professeur', {
        CIN: professeurCIN,
        PhoneNumber: professeurPhoneNumber,
        FullName: professeurFullName,
        email: professeurEmail,
        password: professeurPassword,
        departement: professeurDepartement,
        role: professeurRole,
      })
      .then(response => {
        setResponseData(JSON.stringify(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleGetAllProfesseurs = () => {
    axios
      .post(API_DATABASE+'/get/professeur/all', {})
      .then(response => {
        setResponseData(JSON.stringify(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <form className="form"> 
        <label htmlFor="professeur-cin" className="form-label"> Professeur CIN: </label>
        <input className="form-input" type="text" id="professeur-cin" value={professeurCIN} onChange={e => setProfesseurCIN(e.target.value)} />
        <br />
        <label htmlFor="professeur-phone-number" className="form-label"> Professeur Phone Number: </label>
        <input className="form-input" type="text" id="professeur-phone-number" value={professeurPhoneNumber} onChange={e => setProfesseurPhoneNumber(e.target.value)} />
        <br />
        <label htmlFor="professeur-full-name" className="form-label"> Professeur Full Name: </label>
        <input className="form-input" type="text" id="professeur-full-name" value={professeurFullName} onChange={e => setProfesseurFullName(e.target.value)} />
        <br />
        <label htmlFor="professeur-email" className="form-label"> Professeur Email: </label>
        <input className="form-input" type="text" id="professeur-email" value={professeurEmail} onChange={e => setProfesseurEmail(e.target.value)} />
        <br />
        <label htmlFor="professeur-password" className="form-label"> Professeur Password: </label>
        <input className="form-input" type="text" id="professeur-password" value={professeurPassword} onChange={e => setProfesseurPassword(e.target.value)} />
        <br />
        <label htmlFor="professeur-departement" className="form-label"> Professeur Departement: </label>
        <input className="form-input" type="text" id="professeur-departement" value={professeurDepartement} onChange={e => setProfesseurDepartement(e.target.value)} />
        <br />
        <label htmlFor="professeur-role" className="form-label"> Professeur Role: </label>
        <input className="form-input" type="text" id="professeur-role" value={professeurRole} onChange={e => setProfesseurRole(e.target.value)} />
        <br />
        <button className="form-button" type="button" onClick={handleInsertProfesseur}> Insert Professeur </button>
        <button className="form-button" type="button" onClick={handleGetAllProfesseurs}> Get All Professeurs </button>
        <br />
        <label htmlFor="response-data" className="form-label"> Response Data: </label>
        <textarea className="form-textarea" id="response-data" value={responseData} readOnly />
    </form>
    );
};

export default ProfesseurForm;


