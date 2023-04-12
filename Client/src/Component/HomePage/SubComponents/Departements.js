import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer"; // Import the useInView hook

export default function Departement() {
  const [departements, setDepartements] = React.useState([]);

  const API_Database = process.env.REACT_APP_API_DATABASE;
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(`${API_Database}/departements`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setDepartements(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDepartementClick = (id) => {
    return () => {
      navigate(`/departements`);
      // navigate(`/departements/${id}`)
    };
  };

  // Use the useInView hook to detect when the department card is in view
  const { ref, inView } = useInView({ threshold: 0 });

  return (
    <div className="departement-cont">
      {departements.map((departement) => {
        return (
          <div
            key={departement}
            className={`departement ${inView ? "animate" : ""}`}
            onClick={handleDepartementClick(departement._id)}
            ref={ref}
          >
            <div className="departement-title">
              <h2>{departement.Nom + "\n"}</h2>
            </div>
            <p>{departement.description}</p>
          </div>
        );
      })}
    </div>
  );
}