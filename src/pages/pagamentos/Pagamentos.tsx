import { type FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pagamentos.css";
import logoCanto from "@assets/logo-canto.png";
import { FaSearch } from "react-icons/fa";

type Fornecedor = {
  id: number;
  nome: string;
  cnpj: string;
  saldoDevedor: number;
};

const Pagamento: FunctionComponent = () => {
  const navigate = useNavigate();

  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [busca, setBusca] = useState("");
  const [selecionado, setSelecionado] = useState<Fornecedor | null>(null);
  const [valor, setValor] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/fornecedores")
      .then((res) => res.json())
      .then((data) => setFornecedores(data))
      .catch(() => console.log("Erro ao buscar fornecedores"));
  }, []);

  const filtrados = fornecedores.filter((f) =>
    `${f.nome} ${f.cnpj}`.toLowerCase().includes(busca.toLowerCase())
  );

  const pagar = () => {
    if (!selecionado || !valor) return;

    fetch("http://localhost:3000/api/pagamentos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fornecedorId: selecionado.id,
        valor: Number(valor),
      }),
    }).then(() => {
      alert("Pagamento realizado");
      setValor("");
      setSelecionado(null);
    });
  };

  return (
    <div className="painelDeControle">
      <header className="topo">
        <img src={logoCanto} alt="logo" />
        <span>Sistema de Controle de Acesso e Pagamento em Refeitórios</span>
      </header>

      <div className="container">
        <div className="titulo">PAGAMENTO - FORNECEDOR</div>

        {/* busca */}
        <div className="barraBusca">
          <input
            className="inputBusca"
            type="text"
            placeholder="Nome ou CNPJ..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button className="btnIcon">
            <FaSearch />
          </button>
        </div>

        {/* tabela */}
        <div className="tabela">
          <div className="linha header">
            <span>NOME</span>
            <span>CNPJ</span>
            <span>SALDO</span>
          </div>

          {filtrados.map((f) => (
            <div
              key={f.id}
              className={`linha ${selecionado?.id === f.id ? "selecionado" : ""}`}
              onClick={() => setSelecionado(f)}
            >
              <span>{f.nome}</span>
              <span>{f.cnpj}</span>
              <span>
                {f.saldoDevedor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          ))}
        </div>

        {/* pagamento */}
        <div className="areaPagamento">
          <div>
            <strong>Fornecedor:</strong>{" "}
            {selecionado ? selecionado.nome : "Nenhum selecionado"}
          </div>

          <input
            type="number"
            placeholder="Valor do pagamento"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />

          <button className="btn pagar" onClick={pagar}>
            PAGAR
          </button>
        </div>

        <button
          className="btn voltar"
          onClick={() => navigate("/painel")}
        >
          VOLTAR
        </button>
      </div>
    </div>
  );
};

export default Pagamento;