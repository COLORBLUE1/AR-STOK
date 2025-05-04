import React from "react";
import styled from "styled-components";
import { Link } from "react-router";

const Navbar = styled.nav`
  background: linear-gradient(180deg, #ffffff3e, transparent);
  color: #ffffff;
  display: flex;
  padding: 2rem;
  position: sticky;
top: 0;
z-index: 1000;
justify-content: space-around;
  ul {
    display: flex;
    margin: 0;
    gap: 30px;
    justify-content: center;
    align-items: center;
 .ingresar{
  a {
    background: #fd2f2f;
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

    &:hover {
      background: #00eeff;
      scale: 1.1;
      color: #4e4e4e;
    }
  }
 }
    li {
      cursor: pointer;
      font-size: 1.1rem;
      font-weight: bold;
      text-transform: uppercase;
      font-family: "Roboto", sans-serif;
      transition: color 0.3s;

      &:hover {
        color: #5ea4ff;
      }
    }
  }
`;

const AppBar = () => {
  return (
    <Navbar>
      <ul>
        <li>Inicio</li>
        <li>Sobre nosotros</li>
        <li>Servicios</li>
      </ul>
      <ul>
        <li>Inicio</li>
        <li className="ingresar"> <Link to={"/Login"}>Ver mas</Link></li>
      </ul>
    </Navbar>
  );
};

export default AppBar;