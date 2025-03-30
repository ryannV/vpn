import React, { useState } from "react";
import './App.css';

const App = () => {
  const [cnpj_id, setCnpjId] = useState(null);
  const [tipo, setTipo] = useState("digifarma");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCnpjId(e.target.value);
  };

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
  };

  const handleDownload = async () => {
    setError("");

    if (!cnpj_id) {
      setError("Digite um Client_ID ou CNPJ.");
      return;
    }

    const campoBusca = tipo === "digifarma" ? "client_id" : "cnpj";
    const url = `http://localhost:3000/vpns?${campoBusca}=${cnpj_id}`;

    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      if (data.length === 0) {
        setLoading(false);
        setError("Código não encontrado no banco.");
        return;
      }

      const item = data[0];

      // Validação correta do acesso
      const autorizado = tipo === "digifarma" ? item["digifarma"] === "S" : item["sadi"] === "S";
      if (!autorizado) {
        setLoading(true);
        setError(`Existe o código mas não está habilitado para ${tipo.toUpperCase()}.`);
        return;
      }

      //Criando a URL do download
      const downloadUrl = `http://localhost:5000/download/${tipo}/${cnpj_id}`;
      
      // Criar um link invisível para forçar o download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", `${cnpj_id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Remover o link após o clique

    } catch (error) {
      setLoading(true);
      setError("Erro ao buscar o código. Verifique o servidor.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {/* <h1>VPN</h1> */}
      <section className="container">
        <div>
          <label>
            <input
              type="radio"
              name="tipo"
              value="sadi"
              checked={tipo === "sadi"}
              onChange={handleTipoChange}
            />
            Sadi
          </label>
          <label>
            <input
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
        <input type="number" required value={cnpj_id} onChange={handleChange} placeholder="Digite sem máscaras"/>

        <button onClick={handleDownload}>Download</button>
        {loading && <p>Carregando aguarde...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </section>
    </div>
  );
};

export default App;