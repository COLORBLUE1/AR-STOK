import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CircularProgress from '@mui/material/CircularProgress';
import styled from "styled-components";
import Footer from "../components/Footer";
import { useCarrito } from "../provider/CarritoProvider";
import AppBar from "../components/AppBar";


const SectionMain = styled.section`
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  div {
    width: 100%;
    height: 50vh;
    display: flex;
    justify-content: center;

    p {
      width: 60%;
      text-align: center;
      font-size: 1.2rem;
      margin-top: 2rem;
    }
}

  button {
    display: inline-block;
    padding: 20px 30px;
    background-color: #000000;
    color: white;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.1s ;

    img{
      width: 15px;
      height: 15px;
    }

    &:active{
      background-color: red;
    }
  }
`;

const SectionHeader = styled.header`
  background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(255, 255, 255, 0.144));
  backdrop-filter: blur(7px);
  height: 50vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  h2 {
    text-align: center;
    font-size: 50px;
    color: white;
  }
`;

const Content = styled.section`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: center;
  gap: 50px;

  div:first-child {
  width: 400px;
  height: 300px;
    
    img {
      width: 400px;
      height: 300px;
      border-radius: 15px;
      object-fit: cover;
    } 
  }
    div:last-child {
  background-color: #ffffff;
  width: 400px;
  height: auto;
  margin: 0;
  border-radius: 15px;
  padding:10px;

  p {
      text-align: left;
      font-size: 35px;
      color: #0c0c0c;
      margin: 0;
      }
  }
`;

export function PescadoDetalles() {
  const { id } = useParams();
  const [pescado, setPescado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(logged);
    console.log("Hola", logged);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/api/pescados/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPescado(data);
        setLoading(false);
        console.log("Datos" + data)
      })
      .catch((error) => {
        console.error("Error al cargar los detalles:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!pescado || pescado.error) {
    return <p>pescado turístico no encontrado</p>;
  }

  return (
    <>
      <AppBar />
      <SectionMain style={{ backgroundImage: `url(${pescado.imagen})` }}>

        <SectionHeader>
          <h2>{pescado.nombre}</h2>
        </SectionHeader>
        <Content>
          <div><img src={pescado.imagen} alt="" /></div>

          <div>   <p>{pescado.descripcion_larga}</p></div>    </Content>
        <h4 style={{ color: "#3700ff", background: "white", padding: "10px", borderRadius: "15px", fontSize: "30px" }}>{pescado.precio} $</h4>

        {isLoggedIn && (
          <button onClick={() => agregarAlCarrito(pescado)}>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC5UlEQVR4nO2bu2tUQRSHz2piEHwgCoKISMSAnWCholj6aGKh/gEWgo1CCgkiPkHciC+wUrNrZeNfIKiNhRALCxVE0WiioOimERED6idDJpuTdRfj3nO9dzL3g4HLsMyZ89uzM+fM3BUpKCgoKJgA6AGOAP0NzfX1yGwHeE1rXknkAiCzHWAtcBwoqxaPAM0oBJhOf2DtALBSDAUIkR/AeWBurAJMctVCgHJAbQB4oOb+C1ifSAAJDGAOcEe5cDoqARzAYeXCNYlQgKpy4VhUAgCdwJhyYVNsAuxS0x8FSrEJUFXTv9DuIHUk7PDfGJsAOxOHf+ACVNTULyYZqI6EFf61RKv/JIEKYBP+AQtgE/4hCmAa/oEKsENN+V2i8A9UgEE15UsWA9aRnAN0AJ+mZszm2ATYbhr+AQpwwzT8QxIglfAPTAD78HcA437QcckxwHUlwBXLgcvAV+Cc5Dv8PysBtkhMMD3837vTYIkJ4J4S4LLEBLC/4fJjncQAMB84CvxUAlTSNFgCtgF9Gd/4ngFuAx/0Fg08ARal5Xw38Ij88hBYnpbzy4AR8smov/rqSMV5hztRUQa/+3Izy1vfk8BBd8zd9p3/vwC8UQLskdhgKhV2LJDYYHoE7JXY4M81oPIftrpD7jAzFykt2e4CT4GtWWsgPg8YykgEtwb1Zq2BNGSCaW91t4AvSgT3vEJiAlgNDCe+3w8ZoFcJ8DxPP4E+/1xK2eZiX+I6vqVpq91iyPV1iwGumPEp7qqG/vve1l0LO2lsgyPuMwbf9As/3lsdWUAXsAGYZ+KQUTE06J9NFijglBrrYy4SoL8VQy4tVv3DkgB/mNE03fZvertT6YEkNsyLIWChjoyENmotbHQp++61986k/pgVQ8A+wwh4NgMbY0l9sSyGqsZrwNkZ2Lhp55X9LrA0oY0lfvVvRa1xe8xLMTRkmAesAR43sfGyrT86hJgJMvEHB3fNdcJvjbvTXvh+A3MqXsKiTzAtAAAAAElFTkSuQmCC" alt="shopping-cart--v1" /> Añadir a carrito
          </button>
        )}
        <Footer />
      </SectionMain>
    </>
  );
}
