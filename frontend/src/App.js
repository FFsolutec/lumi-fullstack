import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadFatura from "./UploadFatura";
import FaturaFilter from "./FaturaFilter";
import EnergyGraph from "./EnergyGraph";

function App() {
  const [message, setMessage] = useState("");
  const [extractedData, setExtractedData] = useState(null);
  const [clientInvoices, setClientInvoices] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/test")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  // Função para lidar com o upload e extrair os dados da fatura
  const handleUploadFatura = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload-fatura",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setExtractedData(response.data.data); // Atualiza os dados extraídos
    } catch (error) {
      console.error("Erro ao fazer upload da fatura:", error);
    }
  };

  // Função para lidar com o filtro de faturas
  const handleFilterInvoices = async (clientNumber, referenceMonth) => {
    try {
      const response = await axios.get("http://localhost:5000/api/faturas", {
        params: { clientNumber, referenceMonth },
      });
      setClientInvoices(response.data); // Atualiza os dados filtrados
    } catch (error) {
      console.error("Erro ao buscar faturas:", error);
    }
  };

  return (
    <div className="App">
      <h1>{message}</h1>

      {/* Componente de Upload de Fatura */}
      <UploadFatura onUpload={handleUploadFatura} />

      {/* Exibição dos dados extraídos */}
      {extractedData && (
        <div>
          <h3>Dados Extraídos e Salvos:</h3>
          <p>Número do Cliente: {extractedData.clientNumber}</p>
          <p>Mês de Referência: {extractedData.referenceMonth}</p>
          <p>Energia Consumida: {extractedData.energyConsumed} kWh</p>
          <p>Valor Total: R$ {extractedData.totalAmount}</p>

          {/* Exibição do gráfico de energia */}
          <EnergyGraph
            energyConsumed={extractedData.energyConsumed}
            energyCompensated={extractedData.energyCompensated || 0}
          />
        </div>
      )}

      {/* Componente de Filtro de Faturas */}
      <FaturaFilter onFilter={handleFilterInvoices} />

      {/* Exibição das faturas filtradas */}
      {clientInvoices.length > 0 && (
        <div>
          <h3>Faturas Filtradas:</h3>
          <ul>
            {clientInvoices.map((invoice) => (
              <li key={invoice.id}>
                Cliente: {invoice.clientNumber}, Mês: {invoice.referenceMonth},
                Valor: R$ {invoice.totalAmount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
