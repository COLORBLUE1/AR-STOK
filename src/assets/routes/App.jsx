import { BrowserRouter, Route, Routes } from "react-router";
import { Landing } from "../layouts/Landing";
import { LugarDetalles }  from "../layouts/LugarDetalles";
import { Login }  from "../layouts/Login";
import { Admin } from "../layouts/Admin";
import { LugaresTuristicosAdmin }  from "../layouts/Lugares";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
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
