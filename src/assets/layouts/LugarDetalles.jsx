import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import CircularProgress from '@mui/material/CircularProgress';
import styled from "styled-components";

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

export function LugarDetalles() {
  const { id } = useParams(); // Obtenemos el ID del lugar turístico desde la URL
  const [lugar, setLugar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/api/lugares-turisticos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setLugar(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar los detalles:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!lugar || lugar.error) {
    return <p>Lugar turístico no encontrado</p>;
  }

  return (
    <SectionMain style={{ backgroundImage: `url(${lugar.imagen})` }}>
      <SectionHeader>
        <h2>{lugar.nombre}</h2>
      </SectionHeader>
      <div>
        <p>{lugar.descripcionlarga}</p>
      </div>
    </SectionMain>
  );
}
