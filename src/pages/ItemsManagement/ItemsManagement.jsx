import React, { useState, useEffect } from "react";
import "../ItemsManagement/ItemsManagement.css";

export default function ItemsManagement() {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchItems();
    }, [filter]);

    const fetchItems = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/items?filter=${filter}`);
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error("Error loading items:", error);
        }
    };

    const toggleActive = async (id, current) => {
        try {
            await fetch(`http://localhost:3000/api/items/${id}/active`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ active: !current }),
            });
            fetchItems();
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    const deleteItem = async (id) => {
        if (!window.confirm("Deseja deletar este item?")) return;
        try {
            await fetch(`http://localhost:3000/api/items/${id}`, { method: "DELETE" });
            fetchItems();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return (
        <div className="items-container">

            {/* Sidebar */}
            <aside className="sidebar">
                <div className="icon home">🏠</div>
                <div className="icon cart">🛒</div>
                <div className="icon barcode">🏷️</div>
                <div className="icon settings">🔧</div>
                <div className="icon logout">↩️</div>
            </aside>

            {/* Main Section */}
            <main className="content">

                <header className="top-header">
                    <h1>Gerenciamento de itens</h1>

                    <div className="search-box">
                        <span>🔍</span>
                        <input type="text" placeholder="Buscar por código ou nome do produto..." />
                    </div>

                    <div className="profile">
                        <div className="profile-icon">MS</div>
                        <span className="dropdown">⌄</span>
                    </div>
                </header>

                {/* Filters */}
                <div className="filters">
                    <button
                        className={filter === "all" ? "active" : ""}
                        onClick={() => setFilter("all")}
                    >
                        Todos
                    </button>

                    <button
                        className={filter === "active" ? "active" : ""}
                        onClick={() => setFilter("active")}
                    >
                        Somente Ativos
                    </button>

                    <button
                        className={filter === "inactive" ? "active" : ""}
                        onClick={() => setFilter("inactive")}
                    >
                        Somente Inativos
                    </button>

                    <span className="badge red">Esgotado</span>
                    <span className="badge yellow">Baixo estoque</span>
                    <span className="badge blue">Reabastecido</span>

                    <button className="add-item">+ Adicionar novo item</button>
                </div>

                {/* Table */}
                <table className="items-table">
                    <thead>
                        <tr>
                            <th>CÓDIGO</th>
                            <th>NOME</th>
                            <th>QUANTIDADE</th>
                            <th>PREÇO POR ITEM</th>
                            <th>PREÇO TOTAL</th>
                            <th>STATUS</th>
                            <th>AÇÕES</th>
                            <th>ITEM ATIVO</th>
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
                                    <span
                                        className={`status ${item.status === "Esgotado"
                                                ? "red"
                                                : item.status === "Baixo estoque"
                                                    ? "yellow"
                                                    : "blue"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </td>

                                <td className="actions">
                                    <button onClick={() => deleteItem(item.id)} className="delete">
                                        🗑️
                                    </button>

                                    <button className="edit">
                                        ✏️
                                    </button>
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
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="pagination">
                    <button>{"<"}</button>
                    <span>Página 1 de 3</span>
                    <button>{">"}</button>
                </div>
            </main>
        </div>
    );
}
