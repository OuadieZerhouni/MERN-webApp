import axios from "axios";
import { useEffect } from "react";

const Redirect = () => {
  const URL = process.env.REACT_APP_API_DATABASE;
  useEffect(() => {
    const token = window.location.href.split("=")[1].split("&")[0];
    const departement = window.location.href.split("=")[2];
    if (departement) {
      axios.get(URL + "/departements/" + departement).then((res) => {
        window.localStorage.setItem("departement", JSON.stringify(res.data));
        window.localStorage.setItem("token", token);
        window.location.href = "/Dashboard";
      });
    }
    else {
        window.localStorage.setItem("token", token);
        window.location.href = "/Dashboard";
    }
  }, []);

  return <div>redirecting...</div>;
};

export default Redirect;
