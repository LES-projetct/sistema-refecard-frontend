import { type FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DreDiario.css";
import logoCanto from "@assets/logo-canto.png";

type Dre = {
  totalRecebido: number;
  totalGasto: number;
  clientes: number;
  saldoAnterior: number;
  saldoAtual: number;
};

const DreDiario: FunctionComponent = () => {
  const navigate = useNavigate();

  const [dados, setDados] = useState<Dre>({
    totalRecebido: 0,
    totalGasto: 0,
    clientes: 0,
    saldoAnterior: 0,
    saldoAtual: 0,
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/dre-diario")
      .then((res) => res.json())
      .then((data) => setDados(data))
      .catch(() => console.log("Erro ao carregar DRE"));
  }, []);

  return (
    <div className="painelDeControle">
      <header className="topo">
        <img src={logoCanto} alt="logo" />
        <span>Sistema de Controle de Acesso e Pagamento em Refeitórios</span>
      </header>

      <div className="container">
        <div className="titulo">DRE DIÁRIO</div>

        <div className="gridDre">
          <div className="cardDre">
            <span>TOTAL RECEBIDO</span>
            <strong>
              {dados.totalRecebido.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </div>

          <div className="cardDre">
            <span>SALDO ATUALIZADO</span>
            <strong>
              {dados.saldoAtual.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </div>

          <div className="cardDre">
            <span>TOTAL GASTO</span>
            <strong>
              {dados.totalGasto.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </div>

          <div className="cardDre">
            <span>SALDO ANTERIOR</span>
            <strong>
              {dados.saldoAnterior.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </div>

          <div className="cardDre full">
            <span>NÚMERO DE CLIENTES ATENDIDOS</span>
            <strong>{dados.clientes}</strong>
          </div>
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

export default DreDiario;