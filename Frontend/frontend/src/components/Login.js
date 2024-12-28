import React, { useState } from "react";
import { login, saveToken } from "../services/auth";
import { register } from "../services/user";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const credentials = { username, password };
      setMessage(""); 
      if (isRegistering) {
        console.log("Registro iniciado");
        const responseMessage = await register(credentials);
        console.log(responseMessage);

        if (responseMessage === "Usuário já existe!") {
          setMessage("Erro: Usuário já existe!"); 
        } else if (responseMessage === "Usuário registrado com sucesso!") {
          setMessage("Usuário registrado com sucesso!"); 
          setIsRegistering(false); 
        } else {
          setMessage("Erro desconhecido durante o registro.");
        }
      } else {
        console.log("Login iniciado");
        const response = await login(credentials);
        saveToken(response.token);
        console.log("Login bem-sucedido");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.log(error.message);
      setMessage("Erro ao processar a solicitação.");
    }
  };

  return (
    <div className="login-page"> 
          <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
              <h2>{isRegistering ? "Registro" : "Login"}</h2>
              {message && (
                <p
                  className={`feedback-message ${
                    message.includes("sucesso") ? "success" : "error"
                  }`}
                >
                  {message}
                </p>
              )} 
              <div className="form-group">
                <label htmlFor="username">Usuário</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn">
                {isRegistering ? "Registrar" : "Entrar"}
              </button>
              <button
                type="button"
                className="btn toggle-btn"
                onClick={() => {
                  setIsRegistering((prev) => !prev);
                  setMessage(""); 
                }}
              >
                {isRegistering ? "Voltar ao Login" : "Criar Conta"}
              </button>
            </form>
          </div>
    </div>
    
  );
};

export default Login;
