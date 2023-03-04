import React, { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function userAuth(AdminComponent, ChefComponent, ProfComponent){
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
         Navigate("/Login");
      }
      
    } catch (error) {
      console.log("error checking user role", error);
      Navigate("/Login");
    }
  };
};


export function withAuth(Component) {
  return (props) => {
    const Navigate = useNavigate();
    const proxy = process.env.REACT_APP_proxy;

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        Navigate('/Login');
      }
      axios
      .post(
        proxy + "/auth",
        {},
        {
          headers: { Authentication: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if(!response.data.role){
          Navigate("/Login");
          return;
        }
          
      })
      .catch((error) => {
        Navigate("/Login");
      });
    }, [Navigate, proxy, props]);

    return <Component {...props} />;
  };
};

export function adminChefAuth(Component) {
  return (props) => {
    const Navigate = useNavigate();
    const proxy = process.env.REACT_APP_proxy;

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        Navigate('/Login');
      }
      axios
      .post(
        proxy + "/auth",
        {},
        {
          headers: { Authentication: `Bearer ${token}` },
        }
      )
      .then((response) => {
        if(!response.data.role || response.data.role === "prof"){
          Navigate("/Dashboard");
          return;
        }
          
      })
      .catch((error) => {
        Navigate("/Dashboard");
      });
    }, [Navigate, proxy, props]);

    return <Component {...props} />;
  };
};
