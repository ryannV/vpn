import { useState } from "react";
import styles from './SendEmail.module.css'
import Input from '../components/Input';
import Menu from '../components/Menu';

const SendEmail = ({darkMode, setDarkMode}) => {
    const [tipo, setTipo] = useState([]);
    const [multiempresa, setMultiEmpresa] = useState("");
    const [email, setEmail] = useState("");
    const [nomeCliente, setNomeCliente] = useState("");
    const [telefone, setTelefone] = useState("");
    const [nomeAnalista, setNomeAnalista] = useState("");
    const [qtdLojas, setQtdLojas] = useState(0);
    const [cnpj, setCNPJ] = useState([]);
    const [clientID, setClientID] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState("");

    const handleCnpjChange = (index, value) => {
        setError("");
        setMessage("");
        const newCnpjs = [...cnpj];
        newCnpjs[index] = value;
        setCNPJ(newCnpjs);
    };

    const handleClientIdChange = (index, value) => {
        setError("");
        setMessage("");
        const newClientIds = [...clientID];
        newClientIds[index] = value;
        setClientID(newClientIds);
    };

    const handleEmail = (e) => {
        setError("");
        setMessage("");
        setEmail(e.target.value);
    };

    const handleNomeCliente = (e) => {
        setError("");
        setMessage("");
        setNomeCliente(e.target.value);
    };

    const handleTelefone = (e) => {
        setError("");
        setMessage("");
        setTelefone(e.target.value);
    };

    const handleNomeAnalista = (e) => {
        setError("");
        setMessage("");
        setNomeAnalista(e.target.value);
    };

    const handleTipo = (e) => {
        setError("");
        setMessage("");
        const { value, checked } = e.target;
        if (checked) {
            setTipo(prev => [...prev, value]); // adiciona o valor
        } else {
            setTipo(prev => prev.filter(tipoSelecionado => tipoSelecionado !== value)); // remove o valor
        }
    };

    const handleMultiEmpresa = (e) => {
        setError("");
        setMessage("");
        setMultiEmpresa(e.target.value);
    };

    const handleQtdLojas = (e) => {
        setError("");
        setMessage("");
        setQtdLojas(Number(e.target.value));
    };

    const SendEmail = async () => {
        setError("");
        setMessage("");
        setLoading("Aguarde, enviando e-mail...");
        if (
            !tipo ||
            !email ||
            !nomeCliente ||
            !nomeAnalista ||
            (cnpj.length !== qtdLojas) ||
            (clientID.length !== qtdLojas) ||
            cnpj.some(c => c.trim() === "") ||
            clientID.some(id => id.trim() === "")
        ) {
            console.log((cnpj.length !== qtdLojas))
            setError("Há campo vazio, verifique novamente");
            return;
        }


        const response = await fetch("http://localhost:5000/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                to: email,
                nomeCliente: nomeCliente,
                telefone: telefone,
                nomeAnalista: nomeAnalista,
                cnpj: cnpj,
                tipo: tipo,
                clientID: clientID,
                qtdLojas: qtdLojas,
                multiempresa: multiempresa,
                subject: "Geração de arquivo VPN",
                message: `Aguardamos o prosseguimento desta solicitação ao setor responsável`
            })
        });

        const data = await response.json();
        if (data.success) {
            setLoading("");
            setMessage("Email Enviado com sucesso!")
        } else {
            alert("Erro ao enviar email.");
        }
    };

    return (
        <div>
            <Menu hide={true} darkMode={darkMode} setDarkMode={setDarkMode}/>
            <section className={styles.container}>
                <Input type="email" name="email" id="email" value={email} onChange={handleEmail} placeholder="Digite o email do líder" label="Email" />
                <Input type="text" name="nomeCliente" id="nomeCliente" value={nomeCliente} onChange={handleNomeCliente} placeholder="Digite o nome do cliente" label="Nome do Cliente" />
                <Input type="text" name="telefone" id="telefone" value={telefone} onChange={handleTelefone} placeholder="Digite o numero de telefone" label="Telefone" />
                <Input type="text" name="nomeAnalista" id="nomeAnalista" value={nomeAnalista} onChange={handleNomeAnalista} placeholder="Digite o seu nome" label="Nome do Analista" />
                <Input type="number" name="qtdLojas" id="qtdLojas" value={qtdLojas} onChange={handleQtdLojas} placeholder="Digite a Quantidade de Lojas" label="Quantidade de Lojas" />

                <div className={styles.flex}>
                    <div>
                        <label htmlFor="multiempresa">VPN</label>
                        <div className={styles.label}>
                            <label>
                                <input className={styles.margin_radio}
                                    type="checkbox"
                                    name="tipo"
                                    value="SADI"
                                    checked={tipo.includes("SADI")}
                                    onChange={handleTipo}
                                />
                                Sadi
                            </label>
                            <label>
                                <input className={styles.margin_radio}
                                    type="checkbox"
                                    name="tipo"
                                    value="DIGIFARMA EXTERNO"
                                    checked={tipo.includes("DIGIFARMA EXTERNO")}
                                    onChange={handleTipo}
                                />
                                Digifarma
                            </label>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="multiempresa">MultiEmpresa</label>
                        <div className={styles.label}>
                            <label>
                                <input className={styles.margin_radio}
                                    type="radio"
                                    name="multiempresa"
                                    value="Sim"
                                    checked={multiempresa === "Sim"}
                                    onChange={handleMultiEmpresa}
                                />
                                Sim
                            </label>
                            <label>
                                <input className={styles.margin_radio}
                                    type="radio"
                                    name="multiempresa"
                                    value="Não"
                                    checked={multiempresa === "Não"}
                                    onChange={handleMultiEmpresa}
                                />
                                Não
                            </label>
                        </div>
                    </div>
                </div>

                {Array.from({ length: qtdLojas }).map((_, index) => (
                    <>
                        <Input
                            type="number"
                            name="cnpj"
                            id="cnpj"
                            value={cnpj[index] || ""}
                            onChange={(e) => handleCnpjChange(index, e.target.value)}
                            placeholder={`Digite o CNPJ da loja ${index + 1}`}
                            label="CNPJ"
                        />
                        <Input
                            type="number"
                            name="clientid"
                            id="clientid"
                            value={clientID[index] || ""}
                            onChange={(e) => handleClientIdChange(index, e.target.value)}
                            placeholder={`Digite o ClientID da loja ${index + 1}`}
                            label="ClientID"
                        />
                    </>
                ))}

                <button className={styles.botao} onClick={SendEmail}>Enviar Email</button>
                {error && <p className={styles.error}>{error}</p>}
                {loading && <p>{loading}</p>}
                {message && <p className={styles.complete}>{message}</p>}
            </section>
        </div>
    )
}

export default SendEmail;