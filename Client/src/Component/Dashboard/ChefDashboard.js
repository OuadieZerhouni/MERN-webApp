import React from "react";
import { Link } from "react-router-dom";
import "../../CSS/ComponentCSS/Dashboard.css";
import DataTable from "../DataTable/ChefDataTable";



export default function Dashboard({Prof}) {
  return (
    <div className="Dash-cont">
    
   
      <DataTable Prof={Prof} />
    </div>
  );
}