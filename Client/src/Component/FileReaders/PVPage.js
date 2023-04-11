import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../CSS/ComponentCSS/PDFReader.css";
import CommentSection from "./Comment";

function EmploiReader() {
  const [numPages, setNumPages] = useState(null);
  const [images, setImages] = useState([]);
  const API_DATABASE = process.env.REACT_APP_API_DATABASE;
  const [Download, setDownload] = useState("");

  useEffect(() => {
    axios
      .get(
        API_DATABASE + "/reunions/PV/"+  window.location.pathname.split("/")[2] ,
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        setDownload(response.data.path.replace("/images", ".pdf"));
        let imageDirPath = response.data.path;
        setNumPages(response.data.numPages);
        for (let i = 1; i <= numPages; i++) {
          setImages((images) => [
            ...images,
            `${imageDirPath}${"/page-" + i}.png`,
          ]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [API_DATABASE, numPages]);

  return (
    <div>
      <a href={Download} className="Download-Link">
        Télécharger
      </a>
    <div className="Container">
 
      <div className="PDF-container">
        <div className="PDF-pages">
          {images.map((image, index) => (
            <img
              className="Page-pdf"
              key={index}
              src={image}
              alt="Emploi du temps"
            />
          ))}
        </div>
      </div>

      <CommentSection token={localStorage.getItem("token")} />
    </div></div>
  );
}

export default EmploiReader;