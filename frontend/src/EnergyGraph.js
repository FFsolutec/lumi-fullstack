import React from "react";
import { Bar } from "react-chartjs-2";

function EnergyGraph({ energyConsumed, energyCompensated }) {
  const data = {
    labels: ["Energia Consumida", "Energia Compensada"],
    datasets: [
      {
        label: "kWh",
        data: [energyConsumed, energyCompensated],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  return (
    <div>
      <h3>Gráfico de Energia (kWh)</h3>
      <Bar data={data} />
    </div>
  );
}

export default EnergyGraph;
