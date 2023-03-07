import React from "react";
import { Link } from "react-router-dom";
import "../../CSS/ComponentCSS/Dashboard.css";
import DataTable from "../DataTable/ProfDataTable";



export default function Dashboard(Prof) {
    Prof = Prof.Prof;
  return (
    <div className="Dash-cont">
     <div className="prof-info">
        <p>Nom : {Prof.FullName}</p>
        <p>email : {Prof.email}</p>
        <p>Grade : {Prof.grade}</p>
        </div>
      <DataTable />



    </div>
  );
}