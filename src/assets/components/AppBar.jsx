import React from "react";
import styled from "styled-components";

const Navbar = styled.nav`
  background: #ffffff;
  color: #52525290;
  display: flex;
  justify-content: center;
  padding: 2rem;
  position: sticky;
  top: 0;
  z-index: 1000;
  ul {
    display: flex;
    margin: 0;
    gap: 50px;
    width: 100%;
    justify-content: center;

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
    </Navbar>
  );
};

export default AppBar;