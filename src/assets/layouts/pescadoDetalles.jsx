import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CircularProgress from '@mui/material/CircularProgress';
import styled from "styled-components";
import Footer from "../components/Footer";


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
    background: white;

    p {
      width: 60%;
      text-align: center;
      font-size: 1.2rem;
      margin-top: 2rem;
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

export function PescadoDetalles() {
  const { id } = useParams(); // Obtenemos el ID del pescado turístico desde la URL
  const [pescado, setPescado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/pescados/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPescado(data);
        setLoading(false);
        console.log("Datos"+data)
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
    <SectionMain style={{ backgroundImage: `url(${pescado.imagen})` }}>
      <SectionHeader>
        <h2>{pescado.nombre}</h2>
      </SectionHeader>
      <div>
        <p>{pescado.descripcionlarga}</p>
      </div>
       <Footer/>
    </SectionMain>
  );
}
