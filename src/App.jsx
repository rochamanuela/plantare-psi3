import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Dashboard from "../pages/Dashboard/Dashboard.jsx";
// import Settings from "../pages/Settings/Settings.jsx";

import Login from "./pages/Login/Login.jsx";
import ItemsManagement from "./pages/ItemsManagement/ItemsManagement.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Tela de Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}

        {/* Gerenciamento de Itens */}
        <Route path="/items" element={<ItemsManagement />} />

        {/* Configurações */}
        {/* <Route path="/settings" element={<Settings />} /> */}

      </Routes>
    </BrowserRouter>
  );
}