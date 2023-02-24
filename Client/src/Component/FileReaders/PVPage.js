import React from "react";
import axios from "axios";
import { Document, Page } from 'react-pdf';
import { useEffect, useState } from 'react';



function PDFViewer() {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const API_DATABASE = process.env.REACT_APP_API_DATABASE;
    useEffect(() => {
      axios.post(API_DATABASE+'/option/Emploi_temps', { _id: window.location.pathname.split("/")[2]},
      {headers: {Authorization: "Bearer " + localStorage.getItem("token")}})
        .then(response => {
          setPdfUrl(URL.createObjectURL(response.data));
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }
  
    return (
      <div>
        {pdfUrl &&
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        }
      </div>
    );
  }

export default PDFViewer;

