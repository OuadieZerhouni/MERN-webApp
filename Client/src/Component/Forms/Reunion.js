import React, { useState } from 'react';
import axios from 'axios';

const ReunionForm = () => {
  const [reunionDate, setReunionDate] = useState('');
  const [reunionLieu, setReunionLieu] = useState('');
  const [reunionIdDepartement, setReunionIdDepartement] = useState('');
  const [reunionLoj, setReunionLoj] = useState([]);
  const [reunionProfPresent, setReunionProfPresent] = useState([]);
  const [reunionProfAbsent, setReunionProfAbsent] = useState([]);
  const [responseData, setResponseData] = useState(null);

  let API_DATABASE=process.env.REACT_APP_API_DATABASE;

  const handleInsertReunion = () => {
    axios
      .post(API_DATABASE+'/insert/reunion', {
        Date: reunionDate,
        lieu: reunionLieu,
        id_departement: reunionIdDepartement,
        LOJ: [reunionLoj],
        prof_present: [reunionProfPresent],
        prof_absent: [reunionProfAbsent]
      })
      .then(response => {
        setResponseData(JSON.stringify(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  };


  return (
    <form className="form">
      <label htmlFor="reunion-date" className="form-label">
        Reunion Date:
      </label>
        <input className="form-input" type="text" id="reunion-date" value={reunionDate} onChange={e => setReunionDate(e.target.value)} />
        <br />
        <label htmlFor="reunion-lieu" className="form-label">
            Reunion Lieu:
        </label>
        <input className="form-input" type="text" id="reunion-lieu" value={reunionLieu} onChange={e => setReunionLieu(e.target.value)} />
        <br />
        <label htmlFor="reunion-id-departement" className="form-label">
            Reunion Id Departement:
        </label>
        <input className="form-input" type="text" id="reunion-id-departement" value={reunionIdDepartement} onChange={e => setReunionIdDepartement(e.target.value)} />
        <br />
        <label htmlFor="reunion-loj" className="form-label">
            Reunion LOJ:
        </label>
        <input className="form-input" type="text" id="reunion-loj" value={reunionLoj} onChange={e => setReunionLoj(e.target.value)} />
        <br />
        <label htmlFor="reunion-prof-present" className="form-label">
            Reunion Prof Present:
        </label>
        <input className="form-input" type="text" id="reunion-prof-present" value={reunionProfPresent} onChange={e => setReunionProfPresent(e.target.value)} />
        <br />
        <label htmlFor="reunion-prof-absent" className="form-label">
            Reunion Prof Absent:
        </label>
        <input className="form-input" type="text" id="reunion-prof-absent" value={reunionProfAbsent} onChange={e => setReunionProfAbsent(e.target.value)} />
        <br />
        <button className="form-button" type="button" onClick={handleInsertReunion}>
            Insert Reunion
        </button>
        <br />
        <label htmlFor="response-data" className="form-label">
            Response Data:
        </label>
        
        <textarea className="form-textarea" id="response-data" value={responseData} onChange={e => setResponseData(e.target.value)} />
    </form>
    );
};

export default ReunionForm;
