 import React from "react";


 export default function DepartData(IsOpen,Depart) {
    if (IsOpen) {
        return (
            <div className="depart-data">
                <div className="depart-data-title">
                    <span>Depart</span>
                </div>
                <div className="depart-data-content">
                    <span>{Depart}</span>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

