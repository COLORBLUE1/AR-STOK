import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//Logica
const Pantalla = styled.section`
  background-color: #00c3ff;
  height: 100vh;
  width: 100vw;
  display: grid;
  align-items: center;
  justify-content: center;
`;

const Splasconten = styled.div`
  display: grid;
  justify-items: center;
  color: white;
  font-family: Racing;

  h2 {
    margin: 0;
  }
`;

const Img = styled.img`
  position: relative;
  height: 250px;
  width: 250px;
  margin: auto;

  //animacion de imagen

  animation: bounceIn;
  animation-duration: 1s;
`;

export const Saliendo = () => {
const navigate = useNavigate();
   useEffect(() => {
     const timer = setTimeout(() => {
       navigate("/");
     }, 2000); // Redirige después de 1 segundo

     return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
   }, [navigate]);

  return (
    <Pantalla>
      <Splasconten>
        <Img src="https://us.123rf.com/450wm/inna0910/inna09102109/inna0910210900378/174601298-el-granjero-extiende-sus-manos-a-los-lados-ilustraci%C3%B3n-de-vector-de-estilo-plano.jpg?ver=6" alt="Logo" />
        <h2>Saliendo....</h2>
      </Splasconten>
    </Pantalla>
  );
};