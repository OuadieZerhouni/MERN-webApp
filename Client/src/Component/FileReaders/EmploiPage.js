import React, { useState, useEffect } from "react";
import axios from "axios";
import { Document, Page,  pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


function EmploiReader() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const API_DATABASE = process.env.REACT_APP_API_DATABASE;

  useEffect(() => {
    axios
      .post(
        API_DATABASE + "/option/Emploi_temps",
        { _id: window.location.pathname.split("/")[2] },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          responseType: "arraybuffer",
        }
      )
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [API_DATABASE]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div>
      {pdfUrl && (
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      )}
    </div>
  );
}

export default EmploiReader;
