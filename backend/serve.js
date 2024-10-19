const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./src/routes");
require("dotenv").config(); // Carregar variáveis de ambiente

app.use(cors());
app.use(express.json());

app.use("/api", routes);

// Utilizar a porta definida no .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
