const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/download/:tipo/:codigo", (req, res) => {
  const { tipo, codigo } = req.params;
  const folderPath = path.join(__dirname, "downloads", tipo);

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao ler a pasta de arquivos." });
    }

    let matchingFile;

    if (tipo === "sadi") {
      // Busca EXATA apenas para o tipo sadi (sem hífen ou parte do nome)
      matchingFile = files.find(file => path.basename(file, ".ovpn") === codigo);
    } else {
      // Tipos com lógica flexível (ex: digifarma)
      matchingFile = files.find(file => {
        const base = path.basename(file, ".zip");
        return (
          file.endsWith(".zip") &&
          (
            base.startsWith(codigo) ||       // ex: 280-3660
            base.includes(`-${codigo}`) ||   // ex: 10899-11313
            base.endsWith(codigo)            // ex: termina com 11313
          )
        );
      });
    }

    if (!matchingFile) {
      return res.status(404).json({ error: "Arquivo não encontrado." });
    }

    const filePath = path.join(folderPath, matchingFile);
    res.download(filePath, matchingFile);
  });
});


app.get("/check-file/:tipo/:codigo", (req, res) => {
  const { tipo, codigo } = req.params;
  const pasta = path.join(__dirname, "downloads", tipo);

  fs.readdir(pasta, (err, arquivos) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao ler diretório." });
    }

    const arquivoEncontrado = arquivos.find((nome) => {
      const partes = nome.split(".")[0].split("-");
      return partes.includes(codigo);
    });

    if (!arquivoEncontrado) {
      return res.status(404).json({ error: "Arquivo não encontrado." });
    }

    return res.status(200).json({ fileName: arquivoEncontrado });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});