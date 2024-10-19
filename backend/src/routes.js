const express = require("express");
const router = express.Router();
const { extractDataFromPDF } = require("../utils/pdfExtractor");
const multer = require("multer");
const fs = require("fs");

// Configurando o multer para salvar o arquivo temporariamente
const upload = multer({ dest: "uploads/" });

// Rota para buscar faturas de um cliente específico
router.get("/faturas/:clientNumber", async (req, res) => {
  const { clientNumber } = req.params;

  try {
    const invoices = await Invoice.findAll({ where: { clientNumber } });
    if (!invoices.length) {
      return res
        .status(404)
        .json({ error: "Nenhuma fatura encontrada para o cliente." });
    }
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar faturas." });
  }
});

// Rota para buscar faturas por intervalo de meses
router.get("/faturas", async (req, res) => {
  const { startMonth, endMonth } = req.query;

  try {
    const invoices = await Invoice.findAll({
      where: {
        referenceMonth: {
          [Sequelize.Op.between]: [startMonth, endMonth],
        },
      },
    });

    if (!invoices.length) {
      return res
        .status(404)
        .json({ error: "Nenhuma fatura encontrada no intervalo fornecido." });
    }
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar faturas." });
  }
});

router.get("/faturas", async (req, res) => {
  const { clientNumber, referenceMonth } = req.query;

  const filters = {};
  if (clientNumber) {
    filters.clientNumber = clientNumber;
  }
  if (referenceMonth) {
    filters.referenceMonth = referenceMonth;
  }

  try {
    const invoices = await Invoice.findAll({ where: filters });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar faturas." });
  }
});

router.post("/upload-fatura", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "Arquivo não foi enviado corretamente." });
    }

    const pdfBuffer = fs.readFileSync(req.file.path);
    const mappingType = req.body.type;

    const fieldMappings = {
      luz: {
        clientNumber: "No DO CLIENTE",
        referenceMonth: "Mês de referência",
        energyConsumed: "Energia Elétrica",
        totalAmount: "Valor Total",
      },
      agua: {
        clientNumber: "Número do Cliente",
        referenceMonth: "Mês Referente",
        waterConsumed: "Consumo de Água",
        totalAmount: "Total a Pagar",
      },
    };

    const fieldsMapping = fieldMappings[mappingType];

    if (!fieldsMapping) {
      return res.status(400).json({ error: "Tipo de fatura inválido!" });
    }

    const extractedData = await extractDataFromPDF(pdfBuffer, fieldsMapping);

    // Salvar os dados no banco
    const newInvoice = await Invoice.create(extractedData);

    // Responder com os dados salvos
    res.json({
      message: "Dados extraídos e salvos com sucesso!",
      data: newInvoice,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao extrair dados da fatura." });
  }
});

module.exports = router;
