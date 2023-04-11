import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../../CSS/ComponentCSS/Emploi_temps.css';


function EmploiReader() {
  const [numPages, setNumPages] = useState(null);
  const [images, setImages] = useState([]);
  const API_DATABASE = process.env.REACT_APP_API_DATABASE;
  const[Download, setDownload] = useState('');

  useEffect(() => {
    axios.get(API_DATABASE+'/options/Emploi_temps/'+ window.location.pathname.split("/")[2],
    {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}})
      .then(response => {
        setDownload(response.data.path.replace("/images",".pdf"))
        let imageDirPath=response.data.path
        setNumPages(response.data.numPages);
        for (let i = 1; i <= numPages; i++) {
          setImages(images => [...images, `${imageDirPath}${"/page-"+i}.png`]);
        }   



      })
      .catch(error => {
        console.error(error);
      }
    );

  }, [API_DATABASE, numPages]);
return (
  <div className="Container">
        <a href={Download}  className="Download-Link">Télécharger</a>

  <div className="Emploi-container">
    <div className="Emploi-pages">

    {images.map((image, index) => (
      <img className="Page-Emploi" key={index} src={image} alt="Emploi du temps" />
    ))}
  </div>
  </div>
  </div>
);

}


export default EmploiReader;
