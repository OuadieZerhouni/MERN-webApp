import React, { useState ,useEffect} from "react";
import axios, { Axios } from "axios";
import DepartModal from "../Modals/DepartModal";


const ProfesseurForm = () => {
  const [professeurCIN, setProfesseurCIN] = useState("");
  const [professeurPhoneNumber, setProfesseurPhoneNumber] = useState("");
  const [professeurFullName, setProfesseurFullName] = useState("");
  const [professeurEmail, setProfesseurEmail] = useState("");
  const [professeurPassword, setProfesseurPassword] = useState("");
  const [professeurRole, setProfesseurRole] = useState("PA");
  const [professeurDepartement, setProfesseurDepartement] = useState("");
  const [Departements, setDepartements] = useState([]);
  const [DepartModatIsOpen, setDepartModalIsOpen] = useState(false);
  const [SelectedDepart, setSelectedDepart] = useState("Not Selected");

  let API_DATABASE = process.env.REACT_APP_API_DATABASE;

  const verifyinputs = () => {
    let Error= document.getElementsByClassName('Error')[0]
    if (
      professeurCIN === "" ||
      professeurPhoneNumber === "" ||
      professeurFullName === "" ||
      professeurEmail === "" ||
      professeurPassword === "" ||
      professeurRole === "" ||
    
      Error.innerHTML!==""
    ) {
      alert("Veuillez remplir tous les champs Correctement");
      return false;
    }
    return true;
  };



  const handleInsertProfesseur = () => { 
    if (!verifyinputs()) return;
    axios
      .post(API_DATABASE + "/update/professeur", {
        _id: window.location.pathname.split("/")[3],
        CIN: professeurCIN,
        PhoneNumber: professeurPhoneNumber,
        FullName: professeurFullName,
        email: professeurEmail,
        password:professeurPassword,
        grade: professeurRole,
        id_departement: (professeurDepartement===""?null:professeurDepartement),
      },{headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}
      )
      .then((response) => {
        alert("Professeur Updated!")
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //verify emaill 
  const handleEmail = (e) => {
    const email = e;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let Error= document.getElementsByClassName('Error')[0]
    if (emailRegex.test(email)) {
      setProfesseurEmail(email);
      Error.innerHTML=""
    } else {
      Error.innerHTML="Email is not valid"
    }
  }
  
  /*hanle depart Modal*/
  const handleDepartModal = () => {
    setDepartModalIsOpen(!DepartModatIsOpen);
  };

  const handleDepartementSelection = (Depart) => {
    setSelectedDepart(Depart.Nom);
    setProfesseurDepartement(Depart._id);
    setDepartModalIsOpen(false);
  };

 useEffect(() => {
    
    axios.post(API_DATABASE + "/get/professeur/id",{_id:window.location.pathname.split('/')[3]},
    {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    .then((response)=>{
        setProfesseurCIN(response.data.CIN)
        setProfesseurPhoneNumber(response.data.PhoneNumber)
        setProfesseurFullName(response.data.FullName)
        setProfesseurEmail(response.data.email)
        setProfesseurPassword(response.data.password)
        setProfesseurRole(response.data.grade)
        setProfesseurDepartement(response.data.id_departement)
        axios.post(API_DATABASE + "/get/departement/all",{},
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }}
    ).then((response) => {
      setDepartements(response.data);
      console.log(response.data)
      response.data.map((depart)=>{
        if (depart._id === response.data.id_departement) {
            console.log(depart.Nom)
          setSelectedDepart(depart.Nom);
        }
      });
    })
        
        })

  }, [API_DATABASE]);


  return (
    <div className="form">
      <h1 className="form-title">Modifier Professeur</h1>
      <label htmlFor="professeur-cin" className="form-label">
        {" "}
        CIN:{" "}
      </label>
      <input
        className="form-input"
        type="text"
        id="professeur-cin"
        value={professeurCIN}
        onChange={(e) => setProfesseurCIN(e.target.value)}
      />
      <br />
      <label htmlFor="professeur-phone-number" className="form-label">
     
        N° de telephone:
      </label>
      <input
        className="form-input"
        type="text"
        id="professeur-phone-number"
        placeholder="06..."
        value={professeurPhoneNumber}
        onChange={(e) => setProfesseurPhoneNumber(e.target.value)}
      />
      <br />
      <label htmlFor="professeur-full-name" className="form-label">
       
        Nom & prénom:
      </label>
      <input
        className="form-input"
        type="text"
        id="professeur-full-name"
        pattern="[A-Za-z]{1,32}"
        value={professeurFullName}
        onChange={(e) => setProfesseurFullName(e.target.value)}
      />
      <br />
      <label htmlFor="professeur-email" className="form-label">
       
        Email:
      </label>
      <input
        className="form-input"
        type="email"
        id="professeur-email"
        value={professeurEmail}
        onChange={(e) => setProfesseurEmail(e.target.value)}
        onBlur={(e) => handleEmail(e.target.value)}
      />
      <br />
      <label htmlFor="professeur-password" className="form-label">
       
        Mot de Pass:
      </label>
      <input
        className="form-input"
        type="password"
        id="professeur-password"
        value={professeurPassword}
        onChange={(e) => setProfesseurPassword(e.target.value)}
      />
      <br />
      <label htmlFor="professeur-role" className="form-label">
        
        Professeur Role:
      </label>
      <select
        className="form-input"
        id="professeur-role"
        value={professeurRole}
        onChange={(e) => setProfesseurRole(e.target.value)}
      >
        <option value="PA">PA</option>
        <option value="PH">PH</option>
        <option value="PES">PES</option>
      </select>

      <br />
      <br />
      <label htmlFor="filiere-id-departement" className="form-label">
       Departement:
      </label>
      <button onClick={handleDepartModal} className="Modal-button">
        {SelectedDepart}
      </button>
      <DepartModal
        IsOpen={DepartModatIsOpen}
        toggleModal={handleDepartModal}
        Departements={Departements}
        handleDepartementSelection={handleDepartementSelection}
      ></DepartModal>
      <div className="Error"></div>
      <button
        className="form-button"
        type="button"
        onClick={handleInsertProfesseur}
      >
        Modifier
      </button>
    </div>
  );
};

export default ProfesseurForm;
