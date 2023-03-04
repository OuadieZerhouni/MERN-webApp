import './CSS/App.css';
import { Route, Routes,BrowserRouter as Router,useNavigate } from "react-router-dom";

import {withAuth, userAuth,adminChefAuth} from './Auth/Auth';



import Header from './Component/Header';
import Home from './Component/Home';
import Login from './Auth/Login';
import AdminDashboard from './Component/Dashboard/AdminDashboard';
import ChefDashboard from './Component/Dashboard/ChefDashboard';
import ProfDashboard from './Component/Dashboard/ProfDashboard';


import InsérerDepartementForm from './Component/Forms/Insert/Departement';
import InsérerFiliereForm from './Component/Forms/Insert/Filiere';
import InsérerReunionForm from './Component/Forms/Insert/Reunion';
import InsérerProfesseurForm from './Component/Forms/Insert/Professeur';
import InsérerOptionForm from './Component/Forms/Insert/Option';
import IndérerPostForm from './Component/Forms/Insert/Post';

import ModifyDepartmentForm from './Component/Forms/Update/Departement';
import ModifyFiliereForm from './Component/Forms/Update/Filiere';
import ModifyReunionForm from './Component/Forms/Update/Reunion';
import ModifyProfesseurForm from './Component/Forms/Update/Professeur';
import ModifyOptionForm from './Component/Forms/Update/Option';

  

import PVviewer from './Component/FileReaders/PVPage';
import EmploiTempsViewer from './Component/FileReaders/EmploiPage';






const WithAuthDashboard = userAuth(AdminDashboard, ChefDashboard, ProfDashboard);


const WithAuthDepartementForm = adminChefAuth(InsérerDepartementForm);
const WithAuthFiliereForm = adminChefAuth(InsérerFiliereForm);
const WithAuthReunionForm = adminChefAuth(InsérerReunionForm);
const WithAuthProfesseur = adminChefAuth(InsérerProfesseurForm);
const WithAuthOption = adminChefAuth(InsérerOptionForm);
const WithAuthPost = adminChefAuth(IndérerPostForm);

const WithAuthModifyDepartment = adminChefAuth(ModifyDepartmentForm);
const WithAuthModifyFiliere = adminChefAuth(ModifyFiliereForm);
const WithAuthModifyReunion = adminChefAuth(ModifyReunionForm);
const WithAuthModifyProfesseur = adminChefAuth(ModifyProfesseurForm);
const WithAuthModifyOption = adminChefAuth(ModifyOptionForm);


function App() {
  return (
    <div className="App">
      
      <Router> 
      {window.location.pathname !== '/' && <Header />}
      
     
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/Add/Departement" element={<WithAuthDepartementForm/>} />
          <Route path="/Add/Filiere" element={<WithAuthFiliereForm />} />
          <Route path="/Add/Reunion" element={<WithAuthReunionForm />} />
          <Route path="/Add/Professeur" element={<WithAuthProfesseur />} />
          <Route path="/Add/Option/:id" element={<WithAuthOption />} />
          <Route path="/Add/Option" element={<WithAuthOption />} />
          <Route path="/Add/Post" element={<WithAuthPost />} />

          <Route path='/modify/departement/:id' element={<WithAuthModifyDepartment/>} />
          <Route path='/modify/filiere/:id' element={<WithAuthModifyFiliere/>} />
          <Route path='/modify/reunion/:id' element={<WithAuthModifyReunion/>} />
          <Route path='/modify/professeur/:id' element={<WithAuthModifyProfesseur/>} />
          <Route path='/modify/option/:id' element={<WithAuthModifyOption/>} />
          
          


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
