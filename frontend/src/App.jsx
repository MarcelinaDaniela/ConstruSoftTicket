import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro"; // <-- Importamos la nueva página
import CreateTicket from "./pages/CreateTicket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta inicial: Login */}
        <Route path="/" element={<Login />} />
        
        {/* Ruta para crear un nuevo usuario */}
        <Route path="/registro" element={<Registro />} />
        
        {/* Ruta del formulario de tickets */}
        <Route path="/ticket" element={<CreateTicket />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;