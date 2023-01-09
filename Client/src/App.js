import './App.css';
import { Route, Routes,BrowserRouter as Router } from "react-router-dom";

import DepartementForm from './Component/Departement';


function App() {
  return (
    <div className="App">
      //route /test
      <Router>
        <Routes>
          <Route path="/test" element={<DepartementForm />} />
        </Routes>
      </Router>


      
    </div>
  );
}

export default App;
