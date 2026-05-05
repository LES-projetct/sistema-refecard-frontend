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

	useEffect(() => {
		setProdutos([
			{ id: 1, nome: "Arroz", codigo: "999555", valor: 10, tipo: "UNID", status: "ATIVO" },
			{ id: 2, nome: "Feijão", codigo: "999556", valor: 8, tipo: "UNID", status: "ATIVO" },
			{ id: 3, nome: "Carne", codigo: "999557", valor: 20, tipo: "PESO", status: "INATIVO" },
		]);
	}, []);

	const filtrados = produtos.filter((p) =>
		p.nome.toLowerCase().includes(busca.toLowerCase())
	);

	return (
		<div className="painelDeControle">
			<header className="topo">
				<img src={logoCanto} alt="logo" />
				<span>Sistema de Controle de Acesso e Pagamento em Refeitórios</span>
			</header>

			<div className="container">
				<div className="titulo">PRODUTOS</div>

				{/* busca */}
				<div className="barraBusca">
					<input
						className="inputBusca"
						type="text"
						placeholder="Pesquisar produto..."
						value={busca}
						onChange={(e) => setBusca(e.target.value)}
					/>

					<button className="btnIcon" title="Pesquisar">
						<FaSearch />
					</button>

					<button className="btnIcon" title="Filtrar">
						<FaFilter />
					</button>
				</div>

				{/* tabela */}
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
								<FaEdit />
								<FaTrash />
							</div>
						</div>
					))}
				</div>

				{/* botões */}
				<button className="btn voltar" onClick={() => navigate("/painel")}>
					VOLTAR
				</button>

				<button className="btn exportar">
					EXPORTAR
				</button>

				<button className="btn novo">
					NOVO
				</button>
			</div>
		</div>
	);
};

export default Produtos;