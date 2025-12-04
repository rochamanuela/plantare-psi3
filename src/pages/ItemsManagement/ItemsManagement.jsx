import React, { useState, useEffect } from "react";
import "../ItemsManagement/ItemsManagement.css";
import edit from "../../assets/edit.svg";
import delete_svg from "../../assets/delete.svg"

export default function ItemsManagement() {
    const [allItems, setAllItems] = useState([]);
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const userName = localStorage.getItem("userName");
    const initials = userName
        ? userName.split(" ").map(n => n[0]).join("").toUpperCase()
        : "??";

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    useEffect(() => {
        loadData();
    }, [filter, currentPage, searchTerm, statusFilter]);

    const loadData = async () => {
        try {
            const resp = await fetch("/db.json");
            const data = await resp.json();

            let filtered = data.items;

            if (filter === "active") filtered = filtered.filter(i => i.active);
            if (filter === "inactive") filtered = filtered.filter(i => !i.active);

            if (statusFilter !== "") {
                filtered = filtered.filter(i => i.status === statusFilter);
            }

            if (searchTerm.trim() !== "") {
                const term = searchTerm.toLowerCase();
                filtered = filtered.filter(item =>
                    item.name.toLowerCase().includes(term) ||
                    item.code.toLowerCase().includes(term)
                );
            }

            setAllItems(filtered);

            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            setItems(filtered.slice(start, end));

        } catch (err) {
            console.error("Erro ao carregar mock:", err);
        }
    };

    const totalPages = Math.ceil(allItems.length / itemsPerPage);

    const deleteItem = (id) => {
        if (!window.confirm("Deseja deletar?")) return;

        alert("Mock local: operação apenas visual.");
        const updated = allItems.filter(i => i.id !== id);
        setAllItems(updated);

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setItems(updated.slice(start, end));
    };

    const toggleActive = (id, current) => {
        alert("Mock local: operação apenas visual.");

        const updated = allItems.map(item =>
            item.id === id ? { ...item, active: !current } : item
        );

        setAllItems(updated);

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        setItems(updated.slice(start, end));
    };

    const handleStatusFilter = (status) => {
        if (statusFilter === status) {
            setStatusFilter("");
        } else {
            setStatusFilter(status);
        }

        setCurrentPage(1);
    };

    return (
        <div className="items-container">
            <main className="content">

                <header className="top-header">
                    <h1>Produtos do Catálogo</h1>

                    <div className="search-box">
                        <span>🔍</span>
                        <input
                            type="text"
                            placeholder="Buscar por código ou nome do produto..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>

                    <div className="profile">
                        <div className="profile-icon">{initials}</div>

                        <div className="user-info">
                            <span>{userName}</span>
                            <button className="logout-btn" onClick={logout}>
                                Sair
                            </button>
                        </div>
                    </div>
                </header>

                <div className="filters">
                    <button
                        className={filter === "all" ? "active" : ""}
                        onClick={() => { setFilter("all"); setCurrentPage(1); }}
                    >
                        Todos
                    </button>

                    <button
                        className={filter === "active" ? "active" : ""}
                        onClick={() => { setFilter("active"); setCurrentPage(1); }}
                    >
                        Somente Ativos
                    </button>

                    <button
                        className={filter === "inactive" ? "active" : ""}
                        onClick={() => { setFilter("inactive"); setCurrentPage(1); }}
                    >
                        Somente Inativos
                    </button>

                    <span
                        className={`badge red ${statusFilter === "Esgotado" ? "active-status" : ""}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleStatusFilter("Esgotado")}
                    >
                        Esgotado
                    </span>

                    <span
                        className={`badge yellow ${statusFilter === "Baixo estoque" ? "active-status" : ""}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleStatusFilter("Baixo estoque")}
                    >
                        Baixo estoque
                    </span>

                    <span
                        className={`badge blue ${statusFilter === "Reabastecido" ? "active-status" : ""}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleStatusFilter("Reabastecido")}
                    >
                        Reabastecido
                    </span>

                    <button className="add-item">+ Adicionar novo item</button>
                </div>

                <table className="items-table">
                    <thead>
                        <tr>
                            <th>CÓDIGO</th>
                            <th>NOME</th>
                            <th>QUANTIDADE</th>
                            <th>PREÇO POR ITEM</th>
                            <th>PREÇO TOTAL</th>
                            <th>STATUS</th>
                            <th>ITEM ATIVO</th>
                            <th>AÇÕES</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>R$ {item.unitPrice.toFixed(2)}</td>
                                <td>R$ {(item.quantity * item.unitPrice).toFixed(2)}</td>

                                <td>
                                    <span className={`status ${item.status === "Esgotado"
                                        ? "red"
                                        : item.status === "Baixo estoque"
                                            ? "yellow"
                                            : "blue"
                                        }`}>
                                        {item.status}
                                    </span>
                                </td>

                                <td>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            checked={item.active}
                                            onChange={() => toggleActive(item.id, item.active)}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </td>

                                <td className="actions">
                                    <button className="delete" onClick={() => deleteItem(item.id)}>
                                        <img src={delete_svg} alt="" />
                                    </button>
                                    <button className="edit">
                                        <img src={edit} alt="" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                        {"<"}
                    </button>

                    <span>
                        Página {currentPage} de {totalPages}
                    </span>

                    <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                        {">"}
                    </button>
                </div>

            </main>
        </div>
    );
}
