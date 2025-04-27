const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/download/:tipo/:codigo", (req, res) => {
  const { tipo, codigo } = req.params;
  const folderPath = path.join(__dirname, "downloads", tipo);

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao ler a pasta de arquivos." });
    }

    let matchingFile;

    if (tipo === "sadi") {
      // Busca EXATA 
      matchingFile = files.find(file => path.basename(file, ".ovpn") === codigo);
    } else if (tipo === "digifarma") {
      matchingFile = files.find(file => path.basename(file, ".zip") === codigo);
    } else {
      // Tipos com lógica flexível para o tipo digifarma
      matchingFile = files.find(file => {
        const base = path.basename(file, ".zip");
        return (
          file.endsWith(".zip") &&
          (
            base.startsWith(codigo) ||       // ex: incia com 10889
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

app.post("/send-email", async (req, res) => {
  const { to, subject, message, nomeCliente, telefone, nomeAnalista, cnpj, clientID, tipo, qtdLojas, multiempresa } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ryannvictor72@gmail.com",
        pass: "vqggeawqyodvgbwz"
      }
    });

    const mailOptions = {
      from: "ryannvictor72@gmail.com",
      to,
      subject: subject || "Solicitação de VPN",
      text: 
      `Olá Líder,

      Solicito por meio deste e-mail, a geração do arquivo VPN, segue informações abaixo.

      Informações:
      - CNPJ: ${cnpj}
      - Client ID: ${clientID}
      - Nome: ${nomeCliente}
      - Telefone: ${telefone}
      - Tipo: ${tipo}
      - Quantidade de Lojas: ${qtdLojas}
      - Multiempresa: ${multiempresa}

      ${message}

      Atenciosamente,
      ${nomeAnalista} 
      Analista de Suporte`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).json({ success: false, message: "Erro ao enviar e-mail." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});