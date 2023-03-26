import React from "react";
import axios from "axios";

export default function Departement(){
    const [departements, setDepartements] = React.useState([]); 

    const API_Database = process.env.REACT_APP_API_DATABASE;

    React.useEffect(() => {
        axios.get(`${API_Database}/departements`,{},
        {headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }})
        .then((res) => {
            console.log(res.data);
            setDepartements(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    ,[]);

    return(
        <div className="departement-cont">
            {departements.map((departement) => {return (
                <div key={departement} className="departement">
                    <div className="departement-title">
                        <p>{departement.Nom+'\n'}</p>
                    </div>
                    <p> {departement.description}</p>
                </div> )
            })}
        </div>
    );
}