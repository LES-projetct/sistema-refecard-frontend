import { type FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaFilter, FaEdit, FaTrash } from "react-icons/fa";
import "./Produtos.css";
import logoCanto from "@assets/logo-canto.png";

type Produto = {
  id: number;
  nome: string;
  codigo: string;
  valor: number;
  tipo: string;
  status: string;
};

const Produtos: FunctionComponent = () => {
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState("");

  const [abrirModal, setAbrirModal] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  const [form, setForm] = useState({
    nome: "",
    codigo: "",
    valor: "",
    tipo: "UNID",
    status: "ATIVO",
  });

  useEffect(() => {
    setProdutos([
      { id: 1, nome: "Arroz", codigo: "999555", valor: 10, tipo: "UNID", status: "ATIVO" },
      { id: 2, nome: "Feijão", codigo: "999556", valor: 8, tipo: "UNID", status: "ATIVO" },
    ]);
  }, []);

  const filtrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const abrirNovo = () => {
    setProdutoEditando(null);
    setForm({ nome: "", codigo: "", valor: "", tipo: "UNID", status: "ATIVO" });
    setAbrirModal(true);
  };

  const editarProduto = (p: Produto) => {
    setProdutoEditando(p);
    setForm({
      nome: p.nome,
      codigo: p.codigo,
      valor: String(p.valor),
      tipo: p.tipo,
      status: p.status,
    });
    setAbrirModal(true);
  };

  const excluirProduto = (id: number) => {
    setProdutos(produtos.filter((p) => p.id !== id));
  };

  const salvar = () => {
    if (!form.nome || !form.codigo) return;

    if (produtoEditando) {
      setProdutos(
        produtos.map((p) =>
          p.id === produtoEditando.id
            ? {
                ...p,
                nome: form.nome,
                codigo: form.codigo,
                valor: Number(form.valor),
                tipo: form.tipo,
                status: form.status,
              }
            : p
        )
      );
    } else {
      setProdutos([
        ...produtos,
        {
          id: Date.now(),
          nome: form.nome,
          codigo: form.codigo,
          valor: Number(form.valor),
          tipo: form.tipo,
          status: form.status,
        },
      ]);
    }

    setAbrirModal(false);
    setProdutoEditando(null);
  };

  return (
    <div className="painelDeControle">
      <header className="topo">
        <img src={logoCanto} alt="logo" />
        <span>Sistema de Controle...</span>
      </header>

      <div className="container">
        <div className="titulo">PRODUTOS</div>

        <div className="barraBusca">
          <input
            className="inputBusca"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button className="btnIcon"><FaSearch /></button>
          <button className="btnIcon"><FaFilter /></button>
        </div>

        <div className="tabelaProdutos">
          <div className="headerTabela">
            <span>PRODUTO</span>
            <span>CÓDIGO</span>
            <span>VALOR</span>
            <span>TIPO</span>
            <span>STATUS</span>
            <span>AÇÕES</span>
          </div>

          {filtrados.map((p) => (
            <div key={p.id} className="linhaProduto">
              <span>{p.nome}</span>
              <span>{p.codigo}</span>
              <span>R$ {p.valor.toFixed(2)}</span>
              <span>{p.tipo}</span>
              <span>{p.status}</span>

              <div className="acoesTabela">
                <button onClick={() => editarProduto(p)}>
                  <FaEdit />
                </button>
                <button onClick={() => excluirProduto(p.id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="btn voltar" onClick={() => navigate("/painel")}>
          VOLTAR
        </button>

		<button className="btn exportar" onClick={() => console.log(produtos)}>
          EXPORTAR
        </button>

        <button className="btn novo" onClick={abrirNovo}>
          NOVO
        </button>
      </div>

      {abrirModal && (
        <div className="modalOverlay">
          <div className="modal">
            <h2>{produtoEditando ? "Editar" : "Novo"} Produto</h2>

            <input placeholder="Nome" value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })} />

            <input placeholder="Código" value={form.codigo}
              onChange={(e) => setForm({ ...form, codigo: e.target.value })} />

            <input type="number" placeholder="Valor" value={form.valor}
              onChange={(e) => setForm({ ...form, valor: e.target.value })} />

            <select value={form.tipo}
              onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
              <option>UNID</option>
              <option>PESO</option>
            </select>

            <select value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option>ATIVO</option>
              <option>INATIVO</option>
            </select>

            <div className="modalActions">
              <button onClick={salvar}>SALVAR</button>
              <button onClick={() => setAbrirModal(false)}>CANCELAR</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Produtos;