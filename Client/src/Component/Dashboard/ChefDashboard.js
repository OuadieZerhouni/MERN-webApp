import React from "react";
import { Link } from "react-router-dom";
import "../ComponentCSS/Dashboard.css";
import DataTable from "../DataTable/ChefDataTable";



export default function Dashboard(Prof) {
    Prof = Prof.Prof;
  return (
    <div className="Dash-cont">
     <div className="prof-info">
        <p>Nom : {Prof.FullName}</p>
        <p>email : {Prof.email}</p>
        <p>Grade : {Prof.grade}</p>
        </div>
      <div >
        <Link to="/add/professeur">
          <button className="btn">Ajouter professeur</button>
        </Link> 
        <Link to="/add/filiere">
          <button className="btn">Ajouter filiere</button>
        </Link>
        <Link to="/add/reunion">
          <button className="btn">Ajouter reunion</button>
        </Link>
        <Link to="/add/option">
          <button className="btn">Ajouter option</button>
        </Link>
        <Link to="/add/post">
          <button className="btn">Ajouter post</button>
        </Link>
        </div>
      <DataTable />



    </div>
  );
}