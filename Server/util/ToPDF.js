const pdf = require("html-pdf");
const ExcelJS = require("exceljs");
const fs = require('fs');
const path = require('path');
const pdfPoppler = require('pdf-poppler');


exports.pdfToImages = async (pdfPath) => {
  const pdfParentDir = path.dirname(pdfPath);
  const pdfName = path.basename(pdfPath, path.extname(pdfPath));
  const outputDir = path.join(pdfParentDir, pdfName, "images");

  // Create the output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const opts = {
    format: "png",
    out_dir: outputDir,
    out_prefix: `page`,
  };

  try {
    await pdfPoppler.convert(pdfPath, opts);
    console.log(`Successfully converted PDF to images: ${pdfPath}`);
    return pdfPath;
  } catch (error) {
    console.error(`Failed to convert PDF to images: ${pdfPath}`, error);
    throw error;
  }
};

exports.ToPDF = async (file, optionName) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(file.path);
  const worksheet =  workbook.getWorksheet(1);
  const table = worksheet;
  const tableRows = table._rows;
  const tableData = [];
  tableRows.forEach((row) => {
    const rowData = [];
    row.eachCell((cell) => {
      rowData.push(cell.value);
    });
    tableData.push(rowData);
  });
  let pdfPath = file.path.replace(".xlsx", ".pdf");
  pdfPath= pdfPath.replace("xlsx","pdf");

  return new Promise((resolve, reject) => {
    CreataHTML(tableData, optionName).then((html) => {
      const options = { format: "Letter" };
      pdf.create(html, options).toFile(pdfPath, function (err, res) {
        if (err) {
          reject(err);
        } else {
          console.log(pdfPath);
          resolve(pdfPath);
        }
      });
    });
  });
};


const CreataHTML = async (table, optionName) => {
  let tableHTMLf = () => {
    let tableHTML = `<table>`;
    table.forEach((row) => {
      tableHTML += `<tr>`;
      row.forEach((cell) => {
        tableHTML += `<td>${cell}</td>`;
      });
      tableHTML += `</tr>`;
    });
    tableHTML += `</table>`;
    return tableHTML;
  };
  return (HTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Emploi du temps</title>
        <style>
        img {
            display: block;
            margin: 0 auto;
            width: 300px;
        }

        h1 {    
            margin: 20px auto;
                text-align: center;
                border-bottom: 3px solid #4CAF50;
        }table{
            margin: 50px auto;
            width: 100%;
            border-collapse: collapse;
          }
         td  {
            padding: 10px;
            border: 1px solid black;
            text-align: left;
            background-color: #ccc;
          
          }
              
        th  {
            color: white;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 10px;
            text-align: left;
            background-color: #363841;
            font-weight: bold;
            
          
          }
              
        tr:hover {
                background-color: #f5f5f5;
              }
              
        tbody tr:nth-child(even) {
                background-color: #fafafa;
              }
        </style>
    </head>
    <body>
    <img src="http://www.usmba.ac.ma/~usmba2/wp-content/uploads/2019/06/usmba_90h.png" alt="logo" border="0" >

        <h1>Emploi de temps de ${optionName}</h1>
        ${tableHTMLf()}
    </body>
    </html>
    `);
};
