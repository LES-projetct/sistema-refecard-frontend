import { type FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Usuarios.css";
import logoCanto from "@assets/logo-canto.png";
import { FaSearch, FaFilter } from "react-icons/fa";

type Usuario = {
  id: number;
  nome: string;
  matricula: string;
  saldo: number;
  status: string;
};

const Usuarios: FunctionComponent = () => {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busca, setBusca] = useState("");

  const [abrirModal, setAbrirModal] = useState(false);
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    matricula: "",
    saldo: "",
    status: "Ativo",
  });

  useEffect(() => {
    setUsuarios([
      { id: 1, nome: "João Silva", matricula: "001", saldo: 120, status: "Ativo" },
      { id: 2, nome: "Maria Souza", matricula: "002", saldo: 0, status: "Inativo" },
      { id: 3, nome: "Carlos Lima", matricula: "003", saldo: 50, status: "Ativo" },
    ]);
  }, []);

  const filtrados = usuarios.filter((u) =>
    `${u.nome} ${u.matricula}`.toLowerCase().includes(busca.toLowerCase())
  );

  const salvarUsuario = () => {
    if (!novoUsuario.nome || !novoUsuario.matricula) return;

    setUsuarios([
      ...usuarios,
      {
        id: Date.now(),
        nome: novoUsuario.nome,
        matricula: novoUsuario.matricula,
        saldo: Number(novoUsuario.saldo),
        status: novoUsuario.status,
      },
    ]);

    setNovoUsuario({ nome: "", matricula: "", saldo: "", status: "Ativo" });
    setAbrirModal(false);
  };

  return (
    <div className="painelDeControle">
      <header className="topo">
        <img src={logoCanto} alt="logo" />
        <span>Sistema de Controle de Acesso e Pagamento em Refeitórios</span>
      </header>

      <div className="container">
        <div className="titulo">USUÁRIOS</div>

        {/* busca */}
        <div className="barraBusca">
          <input
            className="inputBusca"
            type="text"
            placeholder="Pesquisar por nome ou matrícula..."
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
            <span>NOME</span>
            <span>MATRÍCULA</span>
            <span>SALDO</span>
            <span>STATUS</span>
            <span>AÇÕES</span>
          </div>

          {filtrados.map((u) => (
            <div key={u.id} className="linha">
              <span>{u.nome}</span>
              <span>{u.matricula}</span>
              <span>
                {u.saldo.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
              <span>{u.status}</span>

              <span className="acoes">
                <button onClick={() => console.log("editar", u.id)}>
                  Editar
                </button>
                <button onClick={() => console.log("excluir", u.id)}>
                  Excluir
                </button>
              </span>
            </div>
          ))}
        </div>

        {/* botões */}
        <button className="btn voltar" onClick={() => navigate("/painel")}>
          VOLTAR
        </button>

        <button
          className="btn exportar"
          onClick={() => console.log(usuarios)}
        >
          EXPORTAR
        </button>

        <button className="btn novo" onClick={() => setAbrirModal(true)}>
          NOVO
        </button>
      </div>

      {/* modal */}
      {abrirModal && (
        <div className="modalOverlay">
          <div className="modal">
            <h2>Novo Usuário</h2>

            <input
              placeholder="Nome"
              value={novoUsuario.nome}
              onChange={(e) =>
                setNovoUsuario({ ...novoUsuario, nome: e.target.value })
              }
            />

            <input
              placeholder="Matrícula"
              value={novoUsuario.matricula}
              onChange={(e) =>
                setNovoUsuario({ ...novoUsuario, matricula: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Saldo"
              value={novoUsuario.saldo}
              onChange={(e) =>
                setNovoUsuario({ ...novoUsuario, saldo: e.target.value })
              }
            />

            <select
              value={novoUsuario.status}
              onChange={(e) =>
                setNovoUsuario({ ...novoUsuario, status: e.target.value })
              }
            >
              <option>Ativo</option>
              <option>Inativo</option>
            </select>

            <div className="modalActions">
              <button onClick={salvarUsuario}>SALVAR</button>
              <button onClick={() => setAbrirModal(false)}>
                CANCELAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuarios;