import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="icon" onClick={() => navigate("/dashboard")}>🏠</div>
      <div className="icon" onClick={() => navigate("/items")}>🛒</div>
      <div className="icon" onClick={() => navigate("/settings")}>⚙️</div>
      <div className="icon" onClick={() => navigate("/")}>↩️</div>
    </aside>
  );
}
