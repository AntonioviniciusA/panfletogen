import React, { useState } from "react";

import * as XLSX from "xlsx";

const FileUpload = ({ onFileUpload }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Assumindo que os dados estão na primeira planilha
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      onFileUpload(jsonData); // Passar os dados para o componente pai
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
    </div>
  );
};

export default FileUpload;
