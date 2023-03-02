import React, { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const roleCheck = (AdminComponent, ChefComponent, ProfComponent) => {
  return (props) => {
    const Navigate = useNavigate();
    const proxy = process.env.REACT_APP_proxy;
    const [role, setRole] =useState("");
    const [prof, setProf] = useState();

    useEffect(() => {
      const checkRole = async () => {
        const token = localStorage.getItem("token");
        axios
          .post(
            proxy + "/auth",
            {},
            {
              headers: { Authentication: `Bearer ${token}` },
            }
          )
          .then((response) => {
            setRole(response.data.role);
            setProf(response.data.prof);
          })
          .catch((error) => {
            Navigate("/Login");
          });
      };
      checkRole();
    }, [Navigate, proxy, props]);
    
    try {
      if (role === "admin") {
        return (<AdminComponent {...props} />);

      } else if (role === "chef") {
        return <ChefComponent {...props} Prof={prof} />;
      } else if (role === "prof") {
        return <ProfComponent {...props} Prof={prof} />;
      } else {
        return <h1>Not Authorized</h1>;
      }
      
    } catch (error) {
      console.log("error checking user role", error);
      window.location = "/Login";
    }
  };
};

export default roleCheck;
