import { type FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Relatorios.css";
import logoCanto from "@assets/logo-canto.png";
import { FaSearch, FaFilter } from "react-icons/fa";

type RelatorioProduto = {
  id: number;
  nome: string;
  quantidade: number;
  totalVendas: number;
  custo: number;
  lucro: number;
};

const Relatorios: FunctionComponent = () => {
  const navigate = useNavigate();

  const [busca, setBusca] = useState("");
  const [dados, setDados] = useState<RelatorioProduto[]>([]);

  const buscarRelatorio = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/relatorios?busca=${busca}`
      );
      const data = await res.json();
      setDados(data);
    } catch (err) {
      console.error("Erro ao buscar relatório", err);
    }
  };

  return (
    <div className="painelDeControle">
      <header className="topo">
        <img src={logoCanto} alt="logo" />
        <span>Sistema de Controle de Acesso e Pagamento em Refeitórios</span>
      </header>

      <div className="container">
        <div className="titulo">RELATÓRIO - PRODUTOS</div>

        {/* busca */}
        <div className="barraBusca">
          <input
            className="inputBusca"
            type="text"
            placeholder="Nome do produto ou código..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <button className="btnIcon" title="Filtrar">
            <FaFilter />
          </button>

          <button
            className="btnIcon"
            title="Pesquisar"
            onClick={buscarRelatorio}
          >
            <FaSearch />
          </button>
        </div>

        {/* tabela */}
        <div className="tabelaRelatorio">
          <div className="linhaHeader">
            <span>PRODUTO</span>
            <span>QTD</span>
            <span>VENDAS</span>
            <span>CUSTO</span>
            <span>LUCRO</span>
          </div>

          {dados.map((item) => (
            <div key={item.id} className="linhaItem">
              <span>{item.nome}</span>
              <span>{item.quantidade}</span>
              <span>
                {item.totalVendas.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
              <span>
                {item.custo.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
              <span>
                {item.lucro.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
          ))}
        </div>

        <button
          className="button voltar"
          onClick={() => navigate("/painel")}
        >
          VOLTAR
        </button>
      </div>
    </div>
  );
};

export default Relatorios;