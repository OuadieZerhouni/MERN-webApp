import './CSS/App.css';
import { Route, Routes,BrowserRouter as Router,useNavigate } from "react-router-dom";


import Header from './Component/Header';
import Home from './Component/Home';
import Login from './Component/Forms/Login';
import Dashboard from './Component/Dashboard';


import InsérerDepartementForm from './Component/Forms/Inserer/Departement';
import InsérerFiliereForm from './Component/Forms/Inserer/Filiere';
import InsérerReunionForm from './Component/Forms/Inserer/Reunion';
import InsérerProfesseurForm from './Component/Forms/Inserer/Professeur';
import InsérerOptionForm from './Component/Forms/Inserer/Option';

import ModifyDepartmentForm from './Component/Forms/Update/Departement';
import ModifyFiliereForm from './Component/Forms/Update/Filiere';
import ModifyReunionForm from './Component/Forms/Update/Reunion';
import ModifyProfesseurForm from './Component/Forms/Update/Professeur';

import PVviewer from './Component/FileReaders/PVPage';
import EmploiTempsViewer from './Component/FileReaders/EmploiPage';


import {  useEffect } from 'react';



const withAuth = (Component) => {
  return (props) => {
    const Navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        Navigate('/Login');
        console.log('not logged in');
      }
    }, [Navigate]);

    return <Component {...props} />;
  };
};


const WithAuthDepartementForm = withAuth(InsérerDepartementForm);
const WithAuthFiliereForm = withAuth(InsérerFiliereForm);
const WithAuthReunionForm = withAuth(InsérerReunionForm);
const WithAuthProfesseur = withAuth(InsérerProfesseurForm);
const WithAuthDashboard = withAuth(Dashboard);
const WithAuthOption = withAuth(InsérerOptionForm);

const WithAuthModifyDepartment = withAuth(ModifyDepartmentForm);
const WithAuthModifyFiliere = withAuth(ModifyFiliereForm);
const WithAuthModifyReunion = withAuth(ModifyReunionForm);
const WithAuthModifyProfesseur = withAuth(ModifyProfesseurForm);


function App() {
  return (
    <div className="App">
      
      <Router> 
      <Header/>
     
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/Add/Departement" element={<WithAuthDepartementForm/>} />
          <Route path="/Add/Filiere" element={<WithAuthFiliereForm />} />
          <Route path="/Add/Reunion" element={<WithAuthReunionForm />} />
          <Route path="/Add/Professeur" element={<WithAuthProfesseur />} />
          <Route path="/Add/Option/:id" element={<WithAuthOption />} />

          <Route path='/modify/departement/:id' element={<WithAuthModifyDepartment/>} />
          <Route path='/modify/filiere/:id' element={<WithAuthModifyFiliere/>} />
          <Route path='/modify/reunion/:id' element={<WithAuthModifyReunion/>} />
          <Route path='/modify/professeur/:id' element={<WithAuthModifyProfesseur/>} />

          <Route path="/Dashboard" element={<WithAuthDashboard />} />
          <Route path="/Login" element={<Login />} />

          <Route path="/PV/:id" element={<PVviewer />} />
          <Route path="/Emploi_temps/:id" element={<EmploiTempsViewer />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
