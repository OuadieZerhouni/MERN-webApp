import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const withRoleCheck = (AdminComponent, ChefComponent, ProfComponent) => {
  return (props) => {
    const Navigate = useNavigate();
    const proxy = process.env.REACT_APP_proxy;

    useEffect(() => {
      const checkRole = async () => {
        const token = localStorage.getItem("token");
        console.log(token);
        axios
          .post(
            proxy + "/auth",
            {},
            {
              headers: { Authentication: `Bearer ${token}` },
            }
          )
          .then((response) => {
            const role = response.data.role;
            console.log(role);

            try {
              if (role === "admin") {
                return (<AdminComponent {...props} />);
              } else if (role === "user") {
                return <ChefComponent {...props} />;
              } else if (role === "prof") {
                return <ProfComponent {...props} />;
              } else {
                Navigate("/Login");
              }
            } catch (error) {
              console.log("error checking user role", error);
              Navigate("/Login");
            }
          })
          .catch((error) => {
            Navigate("/Login");
          });
      };
      checkRole();
    }, [Navigate, proxy, props]);
  };
};

export default withRoleCheck;
