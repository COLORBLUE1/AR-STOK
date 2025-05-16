import { BrowserRouter, Route, Routes } from "react-router";
import { LugarDetalles }  from "../layouts/LugarDetalles";
import { Login }  from "../pages/auth/Login";
import { Admin } from "../layouts/Admin";
import { LugaresTuristicosAdmin }  from "../layouts/Lugares";
import { Home } from "../views/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lugar/:id" element={<LugarDetalles />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/admin-dashboard" element={<Admin />} />
          <Route path="/Lugar-dashboard" element={<LugaresTuristicosAdmin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
