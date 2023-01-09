//component wit three button with className="form-button" 
import React from "react";

export default function Home() {
    return (
        <div>
        <button className="form-button"><a href="/Add/Departement">Insert Departement</a>
        </button>
        <button className="form-button"><a href="/Add/Filiere">Insert Filiere</a>
        </button>
        <button className="form-button"><a href="/Add/Reunion">Insert Reunion</a>
        </button>
        <button className="form-button"> <a href="/Add/Reunion">Get All Reunion</a></button>

        </div>
    );
    }