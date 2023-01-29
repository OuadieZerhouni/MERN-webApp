import React from "react";
import { Link } from "react-router-dom";
import "./ComponentCSS/Home.css";
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/Add/Departement">
        <button className="Insert-Btn">Insert Departement</button>
      </Link>
      <Link to="/Add/Filiere">
        <button className="Insert-Btn">Insert Filiere</button>
      </Link>
      <Link to="/Add/Reunion">
        <button className="Insert-Btn">Insert Reunion</button>
      </Link>
      <Link to="/Add/Professeur">
        <button className="Insert-Btn">Insert Professeur</button>
      </Link>
    </div>
  );
}
