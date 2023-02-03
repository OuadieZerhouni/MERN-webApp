import './CSS/App.css';
import { Route, Routes,BrowserRouter as Router,useNavigate } from "react-router-dom";


import DepartementForm from './Component/Forms/Inserer/Departement';
import FiliereForm from './Component/Forms/Inserer/Filiere';
import ReunionForm from './Component/Forms/Inserer/Reunion';
import Professeur from './Component/Forms/Inserer/Professeur';
import Header from './Component/Header';
import Home from './Component/Home';
import Login from './Component/Forms/Login';
import Dashboard from './Component/Dashboard';
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


const WithAuthDepartementForm = withAuth(DepartementForm);
const WithAuthFiliereForm = withAuth(FiliereForm);
const WithAuthReunionForm = withAuth(ReunionForm);
const WithAuthProfesseur = withAuth(Professeur);
const WithAuthDashboard = withAuth(Dashboard);

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
          <Route path="/Dashboard" element={<WithAuthDashboard />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
