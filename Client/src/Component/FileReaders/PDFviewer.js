import React, { useEffect, useRef } from 'react';
import pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

function PDFViewer(props) {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const url = props.url;

    pdfjsLib.getDocument(url).promise.then(pdf => {
      const viewer = new pdfjsLib.PDFViewer({
        container,
      });

      pdf.getPage(1).then(page => {
        viewer.setDocument(pdf);
        viewer.setCurrentPage(page);
      });
    });
  }, [props.url]);

  return (
    <div ref={containerRef} className="pdfViewer"></div>
  );
}

export default PDFViewer;
