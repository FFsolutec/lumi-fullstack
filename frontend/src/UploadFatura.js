import React, { useState } from "react";

function UploadFatura({ onUpload }) {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("luz");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleUpload = () => {
    if (!file) {
      alert("Por favor, selecione um arquivo para upload.");
      return;
    }
    onUpload(file, type); // Chama a função passada via props
  };

  return (
    <div>
      <h3>Upload de Fatura</h3>
      <select value={type} onChange={handleTypeChange}>
        <option value="luz">Fatura de Luz</option>
        <option value="agua">Fatura de Água</option>
      </select>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadFatura;
