import React from "react";
import { Link } from "react-router";
import styled from "styled-components";
import "animate.css";

const Headecontent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: auto;
  gap: 100px;

  .header-content {
    width: 70%;
    height: 500px;
    display: flex;
    justify-items: center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;

    h2 {
      animation: fadeInUp;
      animation-duration: 1s;
      color: #000000;
      font-size: 3em;
      margin: 0;
    }
    p {
      color: #696969;
      margin: 0;
      width: 550px;
      text-align: center;
    }
  }

  a {
    background: #ffffff;
    padding: 0.5rem 1rem;
    border-radius: 15px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    width: 100px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #216cbd;
    animation: fadeIn;
    animation-duration: 1s;
    transition: all 0.1s;

    &:hover {
      background: #00eeff;
      scale: 1.1;
      color: #4e4e4e;
    }
  }
`;

const Header = () => {
  return (
    <Headecontent>
      <div className="header-content">
        <h2>¿Quieres conocer cali?</h2>
        <p>
          Cali es una ciudad colombiana ubicada en el departamento del Valle del
          Cauca, al suroeste de Bogotá. Es conocida por el baile de la salsa,
          del que hay muchos clubes en el suburbio de Juanchito.
        </p>
        <Link to={"/Login"}>Ver mas</Link>
      </div>
    </Headecontent>
  );
};

export default Header;
