import "./Login.css";
import logo from "../assets/logo.png";

function Login() {
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

                <button className="login-button">
                    LOGIN
                </button>

            </div>

        </div>
    );
}

export default Login;