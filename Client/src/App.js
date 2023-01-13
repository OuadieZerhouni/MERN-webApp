import './App.css';
import { Route, Routes,BrowserRouter as Router } from "react-router-dom";

import DepartementForm from './Component/Forms/Inserer/Departement';
import FiliereForm from './Component/Forms/Inserer/Filiere';
import ReunionForm from './Component/Forms/Inserer/Reunion';
import Professeur from './Component/Forms/Inserer/Professeur';
import Header from './Component/Header';
import Home from './Component/Home';



function App() {
  return (
    <div className="App">
      
      <Router> 
      <Header/>
     
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/Add/Departement" element={<DepartementForm />} />
          <Route path="/Add/Filiere" element={<FiliereForm />} />
          <Route path="/Add/Reunion" element={<ReunionForm />} />
          <Route path="/Add/Professeur" element={<Professeur />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
