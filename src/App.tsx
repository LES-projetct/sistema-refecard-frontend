import { Routes, Route } from "react-router-dom";

import PainelControle from "@pages/painelControle/PainelControle";
import Login from "./login/Login";
import Usuarios from "@pages/usuarios/Usuarios";
import Produtos from "@pages/produtos/Produtos";
import Relatorios from "@pages/relatorios/Relatorios";
import Pagamentos from "@pages/pagamentos/Pagamentos";
import DreDiario from "@pages/dreDiario/DreDiario";
import Devedores from "@pages/devedores/Devedores";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PainelControle />} />
      <Route path="/painel" element={<PainelControle />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/relatorios" element={<Relatorios />} />
      <Route path="/pagamentos" element={<Pagamentos />} />
      <Route path="/dre-diario" element={<DreDiario/>} />
      <Route path="/devedores" element={<Devedores/>} />
    </Routes>

  );
}

export default App;
