import React from "react";
import { Link } from "react-router-dom";
import "../../CSS/ComponentCSS/Dashboard.css";
import DataTable from "../DataTable/ProfDataTable";



export default function Dashboard({Prof}) {
    Prof = Prof.Prof;
  return (
    <div className="Dash-cont">
      <DataTable Prof={Prof}/>
    </div>
  );
}