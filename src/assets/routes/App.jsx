import { BrowserRouter, Route, Routes } from "react-router";
import { PescadoDetalles }  from "../layouts/pescadoDetalles";
import { Login }  from "../pages/auth/Login";
import { Admin } from "../layouts/Admin";
import { LugaresTuristicosAdmin }  from "../layouts/Lugares";
import { Home } from "../views/Home";
import Nosotros from "../pages/extra/Nosotros";
import  Servicios  from "../pages/extra/Servicios";
import { Register } from "../pages/auth/Registrarse";
import Carrito from "../pages/Carrito";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lugar/:id" element={<PescadoDetalles />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/Registro" element={<Register />} />
           <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/servicios" element={<Servicios />} />
          <Route path="/admin-dashboard" element={<Admin />} />
          <Route path="/Lugar-dashboard" element={<LugaresTuristicosAdmin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
