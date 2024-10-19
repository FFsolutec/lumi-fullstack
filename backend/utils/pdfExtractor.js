const pdf = require("pdf-parse");

const extractDataFromPDF = async (pdfBuffer, fieldsMapping) => {
  try {
    const data = await pdf(pdfBuffer);
    const extractedData = {};
    const textLines = data.text.split("\n");

    Object.keys(fieldsMapping).forEach((field) => {
      const fieldPattern = fieldsMapping[field];
      const matchingLine = textLines.find((line) =>
        line.includes(fieldPattern)
      );

      if (matchingLine) {
        const valueMatch = matchingLine.match(/(?:R\$?\s?)?[\d,.]+/);
        extractedData[field] = valueMatch ? valueMatch[0].trim() : "N/A";
      } else {
        extractedData[field] = "N/A";
      }
    });

    return extractedData;
  } catch (error) {
    console.error("Erro ao extrair dados do PDF:", error);
    throw error;
  }
};

module.exports = { extractDataFromPDF };
