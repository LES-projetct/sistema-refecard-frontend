import { type FunctionComponent, useEffect, useState } from "react";
import "./PainelControle.css";
import { useNavigate } from "react-router-dom";

import logoCanto from "@assets/logo-canto.png";
import usuario from "@assets/usuario.png";
import produtos from "@assets/produtos.png";
import relatorios from "@assets/relatorio.png";
import pagamentos from "@assets/pagamentos.png";
import devedores from "@assets/devedores.png";
import drediario from "@assets/dre-diario.png";

const PainelControle: FunctionComponent = () => {
  const [totalArrecadado, setTotalArrecadado] = useState<number>(0);
  const [numAtendimentos, setNumAtendimentos] = useState<number>(0);
  const [valorAberto, setValorAberto] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    // Exemplo de chamada à API
    fetch("http://localhost:3000/api/metricas")
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;
        setTotalArrecadado(data.totalArrecadado ?? 0);
        setNumAtendimentos(data.numAtendimentos ?? 0);
        setValorAberto(data.valorAberto ?? 0);
      })
      .catch((err) => console.error("Erro ao carregar métricas:", err));
  }, []);

  return (
    <div className="painelDeControle">
      {/* topo */}
      <header className="topo">
        <img src={logoCanto} alt="logo" />
        <span>Sistema de Controle de Acesso e Pagamento em Refeitórios</span>
      </header>

      {/* container principal */}
      <div className="container">
        <h1 className="titulo">PAINEL DE CONTROLE</h1>

        <div className="grid">
          <button className="card" onClick={() => navigate("/usuarios")}>
            <img src={usuario} alt="usuarios" />
            <span>USUÁRIOS</span>
          </button>

          <button className="card" onClick={() => navigate("/produtos")}>
            <img src={produtos} alt="produtos" />
            <span>PRODUTOS</span>
          </button>

          <button className="card" onClick={() => navigate("/relatorios")}>
            <img src={relatorios} alt="relatorios" />
            <span>RELATÓRIOS</span>
          </button>

          <button className="card" onClick={() => navigate("/pagamentos")}>
            <img src={pagamentos} alt="pagamentos" />
            <span>PAGAMENTOS</span>
          </button>

          <button className="card" onClick={() => navigate("/dre-diario")}>
            <img src={drediario} alt="dre" />
            <span>DRE DIÁRIO</span>
          </button>

          <button className="card" onClick={() => navigate("/devedores")}>
            <img src={devedores} alt="devedores" />
            <span>DEVEDORES</span>
          </button>
        </div>

        {/* card de métricas */}
        <div className="metricas">
          <div>
            <span>TOTAL ARRECADADO - DATA ATUAL</span>
            <strong>
              {totalArrecadado.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </div>

          <div>
            <span>NÚMERO DE ATENDIMENTOS</span>
            <strong>{numAtendimentos}</strong>
          </div>

          <div>
            <span>VALOR EM ABERTO</span>
            <strong>
              {valorAberto.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PainelControle;