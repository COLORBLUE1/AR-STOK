import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router";
import { useCarrito } from "../provider/CarritoProvider";


const Navbar = styled.nav`
  background: #000000b7;
  height: 0;
  color: #ffffff;
  display: flex;
  padding: 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  justify-content: space-between;
  align-items: center;
  ul {
    display: flex;
    margin: 0;
    gap: 30px;
    justify-content: center;
    align-items: center;
    .ingresar {
      a {
        background: #02c5fb;
        color: #ffffff;
        padding: 0.2rem 0.2rem;
        border-radius: 15px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        width: 100px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn;
        animation-duration: 1s;
        transition: all 0.1s;
        font-family: nunito;

        &:hover {
          background: #00eeff;
          scale: 1.1;
          color: #4e4e4e;
        }
      }
    }
   a {
      color: #ffffff;
      cursor: pointer;

     li {
       cursor: pointer;
       font-family: nunito;
       font-size: 1.1rem;
       font-weight: bold;
       text-transform: uppercase;
       transition: color 0.3s;
       
       &:hover {
         color: #5ea4ff;
        }
        
       
      }
    }
     img{
          width: 30px;
          height: 30px;
          cursor: pointer;
          
          &:hover {
            scale: 1.1;
            transition: all 0.1s;
          }
        }
    }
`;

const AppBar = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [rol, setRol] = React.useState(null);
  const { carrito } = useCarrito();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);


  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    const rol = localStorage.getItem("rol");
    setIsLoggedIn(logged);
    setRol(rol);
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    navigate("/Saliendo");
  }

  return (
    <Navbar>
      <ul>
        <Link to="/"><li>Inicio</li></Link>
        <Link to="/nosotros"> <li>Sobre nosotros</li></Link>
        <Link to="/servicios"><li>Servicios</li></Link>
      </ul>

      <div >
        <ul>{isLoggedIn && (
          <li style={{ position: "relative" }}><img onClick={() => setOpen((o) => !o)} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC5UlEQVR4nO2bu2tUQRSHz2piEHwgCoKISMSAnWCholj6aGKh/gEWgo1CCgkiPkHciC+wUrNrZeNfIKiNhRALCxVE0WiioOimERED6idDJpuTdRfj3nO9dzL3g4HLsMyZ89uzM+fM3BUpKCgoKJgA6AGOAP0NzfX1yGwHeE1rXknkAiCzHWAtcBwoqxaPAM0oBJhOf2DtALBSDAUIkR/AeWBurAJMctVCgHJAbQB4oOb+C1ifSAAJDGAOcEe5cDoqARzAYeXCNYlQgKpy4VhUAgCdwJhyYVNsAuxS0x8FSrEJUFXTv9DuIHUk7PDfGJsAOxOHf+ACVNTULyYZqI6EFf61RKv/JIEKYBP+AQtgE/4hCmAa/oEKsENN+V2i8A9UgEE15UsWA9aRnAN0AJ+mZszm2ATYbhr+AQpwwzT8QxIglfAPTAD78HcA437QcckxwHUlwBXLgcvAV+Cc5Dv8PysBtkhMMD3837vTYIkJ4J4S4LLEBLC/4fJjncQAMB84CvxUAlTSNFgCtgF9Gd/4ngFuAx/0Fg08ARal5Xw38Ij88hBYnpbzy4AR8smov/rqSMV5hztRUQa/+3Izy1vfk8BBd8zd9p3/vwC8UQLskdhgKhV2LJDYYHoE7JXY4M81oPIftrpD7jAzFykt2e4CT4GtWWsgPg8YykgEtwb1Zq2BNGSCaW91t4AvSgT3vEJiAlgNDCe+3w8ZoFcJ8DxPP4E+/1xK2eZiX+I6vqVpq91iyPV1iwGumPEp7qqG/vve1l0LO2lsgyPuMwbf9As/3lsdWUAXsAGYZ+KQUTE06J9NFijglBrrYy4SoL8VQy4tVv3DkgB/mNE03fZvertT6YEkNsyLIWChjoyENmotbHQp++61986k/pgVQ8A+wwh4NgMbY0l9sSyGqsZrwNkZ2Lhp55X9LrA0oY0lfvVvRa1xe8xLMTRkmAesAR43sfGyrT86hJgJMvEHB3fNdcJvjbvTXvh+A3MqXsKiTzAtAAAAAElFTkSuQmCC" alt="shopping-cart--v1" /> ({carrito.reduce((acc, p) => acc + p.cantidad, 0)})</li>
        )}
          {isLoggedIn && (
            <li className="ingresar">
              <a onClick={handleLogout} style={{ background: "red" }}>Salir</a>
            </li>
          )}
          {(rol === "admin") && (
            <li className="ingresar" >
              <Link style={{ background: "green", border: "1px solid #ffffff" }} to={"/admin-dashboard"}>Dashboard</Link>
            </li>
          )}
          {!isLoggedIn && (
            <li className="ingresar" >
              <Link to={"/Login"}>acceder</Link>
            </li>
          )}
        </ul>
        {open && (
          <div style={{
            position: "absolute",
            right: 0,
            top: "100%",
            background: "#666666",
            border: "1px solid #ccc",
            padding: 16,
            zIndex: 10,
            minWidth: 250,
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}>
            <h4>Carrito</h4>
            {carrito.length === 0 ? (
              <p>Tu carrito está vacío</p>
            ) : (
              <>
                <ul style={{
                  maxHeight: "150px", // Ajusta según el alto de tus items (~3 items)
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  padding: 0,
                  margin: 0,
                  listStyle: "none"
                }}>
                  {carrito.map((item) => (
                    <li style={{ padding: "10px", background: "#ffffff59", color: "#ffffff", borderRadius: "15px" }} key={item.id}>
                      {item.nombre} x{item.cantidad} - ${item.precio * item.cantidad}
                    </li>
                  ))}
                </ul>
                <strong>Total: ${total}</strong>
                <br />
                <Link to="/carrito">
                  <button>Ir al carrito</button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default AppBar;
