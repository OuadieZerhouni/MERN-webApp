
import React from "react";
import { Link } from "react-router-dom";
import "../../CSS/ComponentCSS/Dashboard.css";
import DataTable from "../DataTable/AdminDataTable";




export default function Dashboard() {
  console.log("sdqsdqd"+localStorage.getItem("departement"));
    
  return (
    <div className="Dash-cont">
      <DataTable />


    </div>
  );
}