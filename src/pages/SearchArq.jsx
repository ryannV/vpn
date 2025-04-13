import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from './SearchArq.module.css';
import Menu from "../components/Menu";

const SearchArq = () => {
    const navigate = useNavigate();
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
      setDownloadComplete(false);
      setError("");
      setArquivoEncontrado(null);
    };
  
    const handleTipoChange = (e) => {
      setTipo(e.target.value);
      if (arquivoEncontrado) {
        setCnpjId("");
        setButtonHide(true);
      } 
    };
  
    const handleEnter = async (e) => {
      if ( (e.key !== "Enter")) return;
  
      if (!arquivoEncontrado) {
        await buscarArquivo();
      } else {
        baixarArquivo();
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
      
      setCnpjId("");
      setArquivoEncontrado(null);
      setButtonHide(true);
    };

    return (
        <div>
            <Menu />
            <section className={styles.container}>
                <div className={styles.centralizar}>
                    <label>
                        <input className={styles.margin_radio}
                            type="radio"
                            name="tipo"
                            value="sadi"
                            checked={tipo === "sadi"}
                            onChange={handleTipoChange}
                        />
                        Sadi
                    </label>
                    <label>
                        <input className={styles.margin_radio}
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
                    className={styles.inputs}
                    type="number"
                    value={cnpj_id}
                    onChange={handleChange}
                    onKeyUp={handleEnter}
                    placeholder="Digite sem máscaras"
                />

                {buttonHide ?
                    <button className={styles.botao} onClick={buscarArquivo}>Buscar Arquivo</button> :
                    <>
                        <button className={styles.botao} onClick={baixarArquivo}>Baixar agora</button>
                        <p>Arquivo encontrado: {arquivoEncontrado}</p>
                    </>
                }

                {loading && <p>Carregando aguarde...</p>}
                {error && cnpj_id 
                  ? <>
                      <p className={styles.error} >{error}</p>
                      <li className={styles.link} onClick={() => navigate('/Email')}>Solicitar geração da VPN</li>
                    </>
                  : 
                    <>
                        <p className={styles.error} >{error}</p>
                    </>
                }

                {downloadComplete && <p className={styles.complete}>Download Completo</p>}
            </section>
        </div>
    )
}

export default SearchArq;