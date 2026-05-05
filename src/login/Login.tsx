import "./Login.css";
import logo from "../assets/logo-refecard.png";
import { useNavigate } from "react-router-dom"; // importa o hook

function Login() {
  const navigate = useNavigate(); // cria a função de navegação

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    navigate("/"); // leva para a rota PainelControle
  };

  return (
    <div className="page">
      <div className="header">
        <img src={logo} alt="logo" />
        <h1>
          Sistema de Controle de Acesso
          <br />
          e Pagamento em Refeitórios
        </h1>
      </div>

      <div className="login-container">
        <h2 className="login-title">ENTRAR</h2>

        <form onSubmit={handleLogin}>
          <div className="form-row">
            <label htmlFor="usuario">Usuário</label>
            <input
              id="usuario"
              name="usuario"
              type="text"
              placeholder="Digite o usuário"
            />
          </div>

          <div className="form-row">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              name="senha"
              type="password"
              placeholder="Digite a senha"
            />
          </div>

          <button className="login-button" type="submit">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
