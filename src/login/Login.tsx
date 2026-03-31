import "./Login.css";
import logo from "../assets/logo.png";
import { useState } from "react";
import { usuarioService } from "../services/usuarioService";

function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = async () => {
        try {
            const usuario = await usuarioService.login(email, senha);

            console.log("Usuário logado:", usuario);

            alert("Login realizado com sucesso!");


        } catch (error) {
            console.error(error);
            alert("Email ou senha inválidos");
        }
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

                <div className="form-row">
                    <label>Usuário</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite o email"
                    />
                </div>

                <div className="form-row">
                    <label>Senha</label>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Digite a senha"
                    />
                </div>

                <button className="login-button" onClick={handleLogin}>
                    LOGIN
                </button>

            </div>

        </div>
    );
}

export default Login;