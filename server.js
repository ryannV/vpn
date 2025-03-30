const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

// Obter o caminho absoluto da pasta "downloads"
const baseDownloadsPath = path.join(__dirname, "downloads");

app.get("/download/:tipo/:codigo", (req, res) => {
  const { tipo, codigo } = req.params;

  // Definir o nome da pasta corretamente
  const pasta = tipo.toLowerCase() === "sadi" ? "sadi" : "digifarma";

  // Definir a extensão do arquivo baseado no tipo
  const extensao = tipo.toLowerCase() === "sadi" ? "ovpn" : "zip";

  // Construir o caminho correto do arquivo
  const filePath = path.join(baseDownloadsPath, pasta, `${codigo}.${extensao}`);

  console.log(`Tentando baixar: ${filePath}`); // Depuração

  // Enviar o arquivo para download
  res.download(filePath, `${codigo}.${extensao}`, (err) => {
    if (err) {
      console.error("Erro no download:", err);
      res.status(404).json({ error: "Arquivo não encontrado" });
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});