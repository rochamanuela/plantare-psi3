import React, { useState } from "react";
import "./Login.css";

export default function Login() {
    const [emailOrCpf, setEmailOrCpf] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        // Example for connecting to backend
        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailOrCpf, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login realizado!");
                // handle navigation here
            } else {
                alert(data.message || "Erro ao realizar login.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Falha na conexão com o servidor.");
        }
    };

    return (
        <div className="login-container">
            {/* LEFT SIDE */}
            <div className="left-section">
                <img
                    src="/logo.png"
                    alt="Plantar Logo"
                    className="logo"
                />

                <p className="left-subtitle">
                    Da raiz à gestão, tudo<br />em um só lugar.
                </p>

                <img
                    src="/dashboard-preview.png"
                    alt="Dashboard preview"
                    className="dashboard-img"
                />
            </div>

            {/* RIGHT SIDE */}
            <div className="right-section">
                <h1 className="title">Login</h1>

                <p className="subtitle">
                    Bem vindo(a) de volta! Utilize suas credenciais para prosseguir
                </p>

                <form className="form" onSubmit={handleLogin}>
                    <label className="label">E-mail ou CPF</label>
                    <input
                        type="text"
                        placeholder="name.example@email.com"
                        value={emailOrCpf}
                        onChange={(e) => setEmailOrCpf(e.target.value)}
                    />

                    <label className="label">Senha</label>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" className="btn-primary">ENTRAR</button>
                </form>

                <p className="no-account">
                    Não possui cadastro? <a href="#">Clique aqui</a>
                </p>

                <button className="btn-secondary">ESQUECI MINHA SENHA</button>
            </div>
        </div>
    );
}
