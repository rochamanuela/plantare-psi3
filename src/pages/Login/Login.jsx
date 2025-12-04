import React, { useState } from "react";
import LoginImg from "../../assets/login-image.png"
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const resp = await fetch("/dbUsers.json");
            const data = await resp.json();

            const user = data.users.find(
                u => u.email === email && u.password === senha
            );

            if (!user) {
                alert("Usuário ou senha incorretos.");
                return;
            }

            // Salvar dados no localStorage
            localStorage.setItem("userName", user.name);
            localStorage.setItem("userEmail", user.email);

            navigate("/items");

        } catch (err) {
            console.error("Erro ao carregar usuários:", err);
            alert("Erro ao conectar com o servidor.");
        }
    };

    return (
        <div className="login-container">
            <img src={LoginImg} alt="" className="login-img" />

            <div className="right-section">
                <h1 className="title">Login</h1>

                <p className="subtitle">
                    Bem vindo(a) de volta! Utilize suas credenciais para prosseguir
                </p>

                <form className="form" onSubmit={handleLogin}>
                    <label className="label">E-mail</label>
                    <input
                        type="text"
                        placeholder="name.example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="label">Senha</label>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <button type="submit" className="btn-primary">ENTRAR</button>
                </form>
            </div>
        </div>
    );
}
