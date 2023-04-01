import React, { useState } from 'react';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [FilieresDeparts, setFilieresDeparts] = useState({});

  const API_Database = process.env.REACT_APP_API_DATABASE;

  const handleDepartmentClick = async (department) => {
    if(selectedDepartment && selectedDepartment === department)
        setSelectedDepartment(null);
    else setSelectedDepartment(department);
  };

    React.useEffect(() => {
        axios.get(`${API_Database}/departements`,{})
        .then((res) => {
            setDepartments(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    

        axios.get(`${API_Database}/filieres`,{})
        .then((res) => {
            res.data.forEach(filiere => {
                setFilieresDeparts({...FilieresDeparts, [filiere.department_id]: [...FilieresDeparts[filiere.department_id], filiere]});
            });
        })
     } ,[]);

  return (
    <div>
      <h2>Departments</h2>
      <ul>
        {departments.map((department) => (
          <li key={department._id} onClick={() => handleDepartmentClick(department)}>
            {department.Nom}
            {selectedDepartment && selectedDepartment._id === department._id && (
              <div>
                <p>{selectedDepartment.description}</p>
                <p>{selectedDepartment.Date_Creation}</p>
                {FilieresDeparts[department._id] && FilieresDeparts[department._id].map((filiere) => (
                    <p>{filiere.Nom}</p>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DepartmentList;