const pdf = require("pdf-parse");

const extractDataFromPDF = async (pdfBuffer, fieldsMapping) => {
  try {
    const data = await pdf(pdfBuffer);
    const extractedData = {};
    const textLines = data.text.split("\n");

    console.log("PDF Content:", data.text); // Verificar o conteúdo bruto do PDF
    console.log("Field Mapping:", fieldsMapping); // Verificar o mapeamento de campos

    // Iterar sobre o mapeamento para extrair os campos desejados
    Object.keys(fieldsMapping).forEach((field) => {
      const fieldPattern = fieldsMapping[field];
      const matchingLine = textLines.find((line) =>
        line.includes(fieldPattern)
      );

      if (matchingLine) {
        console.log(`Matching line found for ${field}:`, matchingLine);
        const valueMatch = matchingLine.match(/(?:R\$?\s?)?[\d,.]+/); // Ajuste a regex se necessário
        extractedData[field] = valueMatch ? valueMatch[0].trim() : "N/A";
      } else {
        // Se não encontrar, apenas não adiciona o campo ao resultado
        console.warn(`No matching line found for ${field}`);
      }
    });

    return extractedData;
  } catch (error) {
    console.error("Erro ao extrair dados do PDF:", error);
    throw error;
  }
};

module.exports = { extractDataFromPDF };
