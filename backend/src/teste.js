const { extractDataFromPDF } = require("../utils/pdfExtractor");
const fs = require("fs");

test("Testa extração de dados de PDF de fatura", async () => {
  const pdfBuffer = fs.readFileSync("path/to/fakeInvoice.pdf");
  const fieldsMapping = {
    clientNumber: "No DO CLIENTE",
    referenceMonth: "Mês de referência",
    energyConsumed: "Energia Elétrica",
  };
  const extractedData = await extractDataFromPDF(pdfBuffer, fieldsMapping);
  expect(extractedData.clientNumber).toBe("100123");
  expect(extractedData.referenceMonth).toBe("SET/2024");
});
