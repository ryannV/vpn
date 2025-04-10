import React, { useState } from "react";
import './App.css';

const App = () => {
  const [cnpj_id, setCnpjId] = useState("");
  const [tipo, setTipo] = useState("digifarma");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [arquivoEncontrado, setArquivoEncontrado] = useState(null);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [buttonHide, setButtonHide] = useState(true);

  const handleChange = (e) => {
    setCnpjId(e.target.value);
    setButtonHide(true);
  };

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
  };

  const handleEnter = (e) => {
    if ( (e.key !== "Enter")) {
      if (arquivoEncontrado) {
        buscarArquivo();
      } else {
        baixarArquivo();
      }
    }
  }

  const buscarArquivo = async () => {
    setError("");
    setArquivoEncontrado(null);
    setDownloadComplete(false);

    if (!cnpj_id) {
      setError("Digite um Client_ID ou CNPJ.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/check-file/${tipo}/${cnpj_id}`);
      if (!response.ok) {
        throw new Error("Arquivo não encontrado");
      }
      const data = await response.json();
      setArquivoEncontrado(data.fileName);
      setButtonHide(false);
    } catch (err) {
      console.error("Erro ao buscar arquivo:", err);
      setError("Arquivo não encontrado para esse código.");
    } finally {
      setLoading(false);
    }
  };

  const baixarArquivo = () => {
    if (!arquivoEncontrado) return;
    setDownloadComplete(true);
    const downloadUrl = `http://localhost:5000/download/${tipo}/${arquivoEncontrado.split('.')[0]}`;
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.setAttribute("download", arquivoEncontrado);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setArquivoEncontrado(null);
    setCnpjId("");
    setButtonHide(true);
  };

  return (
    <div className="App">
      <section className="container">
        <div className="centralizar">
          <label>
            <input className="margin-radio"
              type="radio"
              name="tipo"
              value="sadi"
              checked={tipo === "sadi"}
              onChange={handleTipoChange}
            />
            Sadi
          </label>
          <label>
            <input className="margin-radio"
              type="radio"
              name="tipo"
              value="digifarma"
              checked={tipo === "digifarma"}
              onChange={handleTipoChange}
            />
            Digifarma
          </label>
        </div>

        <label>CNPJ/Client_ID</label>
        <input
          type="number"
          value={cnpj_id}
          onChange={handleChange}
          onKeyUp={handleEnter}
          placeholder="Digite sem máscaras"
        />

        {buttonHide ?
          <button className="botao" onClick={buscarArquivo}>Buscar Arquivo</button> :
          <>
            <button className="botao" onClick={baixarArquivo}>Baixar agora</button>
            <p>Arquivo encontrado: {arquivoEncontrado}</p>
          </>
        }

        {loading && <p>Carregando aguarde...</p>}
        {error && <p className="error" >{error}</p>}

        {downloadComplete && <p className="complete">Download Completo</p>}
      </section>
    </div>
  );
};

export default App;