// components/ExcelUpload.js
import React, { useState } from "react";
import * as XLSX from "xlsx"; // Certifique-se de ter a biblioteca `xlsx` instalada

const ExcelUpload = () => {
  const [data, setData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
        console.log(jsonData); // Exibe os dados importados no console
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={handleFileChange}
      />
      {/* Aqui você pode renderizar a tabela ou qualquer outra coisa com os dados importados */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default ExcelUpload;
