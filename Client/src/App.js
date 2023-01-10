import './App.css';
import { Route, Routes,BrowserRouter as Router } from "react-router-dom";

import DepartementForm from './Component/Forms/Departement';
import FiliereForm from './Component/Forms/Filiere';
import Home from './Component/Home';
import ReunionForm from './Component/Forms/Reunion';
import Professeur from './Component/Forms/Professeur';


function App() {
  return (
    <div className="App">
      <Router>
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
