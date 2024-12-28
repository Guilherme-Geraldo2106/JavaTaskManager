import React, { useState } from "react";
import { login, saveToken } from "../services/auth";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Login iniciado");

        const credentials = { username, password };
        const response = await login(credentials);
        saveToken(response.token);

      console.log("Login bem-sucedido");
      window.location.href = "/dashboard"; // Exemplo de redirecionamento
    } catch (error) {
      console.log(error.message);
    }
  };


  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
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
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;

