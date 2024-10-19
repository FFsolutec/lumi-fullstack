import React, { useState } from "react";

function FaturaFilter({ onFilter }) {
  const [clientNumber, setClientNumber] = useState("");
  const [referenceMonth, setReferenceMonth] = useState("");

  const handleFilter = () => {
    onFilter(clientNumber, referenceMonth); // Chama a função passada via props
  };

  return (
    <div>
      <h3>Filtro de Faturas</h3>
      <input
        type="text"
        placeholder="Número do Cliente"
        value={clientNumber}
        onChange={(e) => setClientNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Mês de Referência"
        value={referenceMonth}
        onChange={(e) => setReferenceMonth(e.target.value)}
      />
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  );
}

export default FaturaFilter;
