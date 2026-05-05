import { type FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Devedores.css";
import logoCanto from "@assets/logo-canto.png";
import { FaSearch, FaFilter } from "react-icons/fa";

type Devedor = {
  id: number;
  nome: string;
  cpf: string;
  valorAberto: number;
  ultimaCompra: string;
};

const Devedores: FunctionComponent = () => {
  const navigate = useNavigate();

  const [lista, setLista] = useState<Devedor[]>([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/devedores")
      .then((res) => res.json())
      .then((data) => setLista(data))
      .catch(() => console.log("Erro ao buscar devedores"));
  }, []);

  const filtrados = lista.filter((c) =>
    `${c.nome} ${c.cpf}`.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="painelDeControle">
      <header className="topo">
        <img src={logoCanto} alt="logo" />
        <span>Sistema de Controle de Acesso e Pagamento em Refeitórios</span>
      </header>

      <div className="container">
        <div className="titulo">CLIENTES DEVEDORES</div>

        {/* busca */}
        <div className="barraBusca">
          <input
            className="inputBusca"
            type="text"
            placeholder="Nome ou CPF..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <button className="btnIcon">
            <FaFilter />
          </button>

          <button className="btnIcon">
            <FaSearch />
          </button>
        </div>

        {/* tabela */}
        <div className="tabela">
          <div className="linha header">
            <span>CLIENTE</span>
            <span>CPF</span>
            <span>VALOR EM ABERTO</span>
            <span>ÚLTIMA COMPRA</span>
          </div>

          {filtrados.map((c) => (
            <div key={c.id} className="linha">
              <span>{c.nome}</span>
              <span>{c.cpf}</span>
              <span>
                {c.valorAberto.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
              <span>{c.ultimaCompra}</span>
            </div>
          ))}
        </div>

        <button className="btn voltar" onClick={() => navigate("/painel")}>
          VOLTAR
        </button>
      </div>
    </div>
  );
};

export default Devedores;